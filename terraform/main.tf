# Generate a random suffix for naming
resource "random_string" "rg_suffix" {
    length = 6
    special = false
    upper = false
}

resource "azurerm_resource_group" "rg" {
    location    = var.resource_group_location
    name        = "rg-${var.local_name}-${random_string.rg_suffix.id}"
    tags = {
        owner       = "${var.resource_group_owner }"
    }
}
 
resource "azurerm_log_analytics_workspace" "test" {
    name                = "law-${var.local_name}-${random_string.rg_suffix.id}"
    location            = azurerm_resource_group.rg.location
    resource_group_name = azurerm_resource_group.rg.name
    sku                 = var.log_analytics_workspace_sku
}

resource "azurerm_log_analytics_solution" "test" {
    location                = azurerm_log_analytics_workspace.test.location
    resource_group_name     = azurerm_resource_group.rg.name
    solution_name           = "ContainerInsights"
    workspace_name          = azurerm_log_analytics_workspace.test.name
    workspace_resource_id   = azurerm_log_analytics_workspace.test.id

    plan {
        product   = "OMSGallery/ContainerInsights"
        publisher = "Microsoft"
    }
}

resource azurerm_user_assigned_identity "uami-aks" {
  name                = "uami-aks-${var.local_name}-${random_string.rg_suffix.id}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
}

resource "azurerm_kubernetes_cluster" "k8s" {
  location                         = azurerm_resource_group.rg.location
  name                             = "aks-${var.local_name}-${random_string.rg_suffix.id}"
  kubernetes_version               = "1.31.3"
  resource_group_name              = azurerm_resource_group.rg.name
  dns_prefix                       = "dns-${random_string.rg_suffix.id}"
  http_application_routing_enabled = true
    
  identity {
    type = "UserAssigned"
    identity_ids = [azurerm_user_assigned_identity.uami-aks.id]
  }

  default_node_pool {
    name       = "systempool"
    vm_size    = var.system_node_pool_vm_size
    node_count = var.system_node_pool_node_count
    tags = { owner = var.resource_group_owner }
  }

  linux_profile {
    admin_username = var.username

    ssh_key {
      key_data = azapi_resource_action.ssh_public_key_gen.output.publicKey
    }
  }

  network_profile {
    network_plugin    = "azure"
    network_policy    = "cilium"
    network_data_plane = "cilium"
  }

  web_app_routing {
    dns_zone_ids = []
  }
}



