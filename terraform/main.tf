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

resource "null_resource" "wait_for_aks" {
  depends_on = [azurerm_kubernetes_cluster.k8s]

  provisioner "local-exec" {
    command = <<EOT
      max_retries=10
      retries=0
      while [ "$(az aks show --resource-group ${azurerm_resource_group.rg.name} --name ${azurerm_kubernetes_cluster.k8s.name} --query "provisioningState" -o tsv)" != "Succeeded" ]; do
        if [ $retries -ge $max_retries ]; then
          echo "Max retries exceeded. Exiting..."
          exit 1
        fi
        echo "Waiting for AKS cluster to be fully provisioned... (Attempt: $((retries+1)))"
        retries=$((retries+1))
        sleep 30
      done
    EOT
  }
}

resource "azurerm_kubernetes_cluster_node_pool" "temporal" {
  name                  = "tmprlpool"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.k8s.id
  vm_size               = "Standard_D2_v4"
  node_count            = 1
  auto_scaling_enabled  = true
  min_count             = 1
  max_count             = 20
  os_type               = "Linux"
  os_disk_size_gb       = 50
  mode                  = "User"
  
  node_labels = {
    "app"           = "temporal"
  }
  
  tags = {
    owner = var.resource_group_owner
  }
  
  # Azure best practice: Using availability zones for high availability
  zones = [1, 2, 3]
  
  # Add taints if you want to dedicate this node pool to specific workloads
  # node_taints = ["dedicated=temporal:NoSchedule"]
}


