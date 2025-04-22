# variable "agent_count" {
#   default = 3
# }

# The following two variable declarations are placeholder references.
# Set the values for these variable in terraform.tfvars
# variable "aks_service_principal_app_id" {
#   default = ""
# }

# variable "aks_service_principal_client_secret" {
#   default = ""
# }

variable "dns_prefix" {
  default = "temporaltest"
}

variable "resource_group_location" {
    default = "westus3"
}

variable resource_group_owner {
  default = "temporal-demo"
  description = "owner of the resource group"
}

# Refer to https://azure.microsoft.com/pricing/details/monitor/ for Log Analytics pricing
variable "log_analytics_workspace_sku" {
  default = "PerGB2018"
}

variable "local_name" {
  default     = "tmprldemo"
  description = "local name used to compose resource names"
}

variable system_node_pool_vm_size {
  default     = "Standard_DS2_v2"
  description = "VM size for the system node pool."
}

variable system_node_pool_node_count {
  default     = 3
  description = "Number of nodes in the system node pool."
}

variable "username" {
  default     = "azureuser"
  description = "Username for the Linux profile."
}

variable "subscription_id" {
    description = "Azure subscription ID."
}

