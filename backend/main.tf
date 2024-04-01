# Sets the provider to azure resource manager - Standard
terraform {
    required_providers {
        azurerm = {
            source  = "hashicorp/azurerm"
            version = "=3.96.0"
        }
    }
}

# Configure the Microsoft Azure Provider - Standard
provider "azurerm" {
  skip_provider_registration = true 
  features {}
}

# Defines the Resource container
resource "azurerm_resource_group" "rg" {
  name     = "linkupStorageAcc"
  location = "West Europe"
}

# Creates Azure App Service Plan for our web app
resource "azurerm_service_plan" "asp" {
  name                = "linkupSubscriptionPlan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "B1"

  # Sku: subscription plan
}

# Creates The App Service where we host our backend
resource "azurerm_linux_web_app" "as" {
  name                     = "linkupBackend"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  service_plan_id          = azurerm_service_plan.asp.id

  site_config {}
}

# Creates the Storage account for storing images
resource "azurerm_storage_account" "storage" {
  name                     = "linkupimagesbachelor"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
}
