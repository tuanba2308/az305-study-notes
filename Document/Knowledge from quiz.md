## Azure 305 Knowledge Log

### Entry Template

### Entry

---

## Design identity, governance, and monitoring solutions (25–30%)

<!-- Add related entries below -->

### Entry

**Topic:** Identity Management for External Users in Microsoft Entra

**Summary:** Understanding how to enable self-service account management for external users (customers) and which Azure identity solution best supports customer-facing applications.

**Key Points:**

- 🔧 **Azure Service Being Referenced:** Azure Active Directory B2C (Business to Consumer)
	- Build secure, scalable identity experiences for customers.
	- Users can sign up, sign in, reset passwords, and manage profiles without IT intervention.
	- Supports social identity providers (Google, Facebook, etc.) and custom policies.

- 📊 **Pros and Cons of Each Option:**

| Option | Pros | Cons |
|--------|------|------|
| Microsoft Entra B2B direct connect | Seamless collaboration with external organizations. | Not designed for customer self-service; better for business partners. |
| Azure AD B2C | Tailored for customer identity; supports self-service, social logins, and custom branding. | Requires setup and integration with your apps. |
| Microsoft Entra B2B | Good for managing external business users with their own credentials. | Not suitable for individual customer scenarios. |
| AD FS | Legacy solution; supports federation with other identity providers. | Complex setup, outdated, and lacks modern self-service features. |

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** Azure Monitor Log Analytics Workspaces for Global Compliance

**Summary:** A global company operating across multiple regions (East US, Central US, North Europe, West Europe, East Asia, Southeast Asia) wants to centralize log storage using Azure Monitor. Their goals include minimizing administrative overhead, minimizing costs, meeting regional compliance requirements, and ensuring data sovereignty.

**Key Points:**
- 📌 **Summary**
  - Each Azure geography (United States, Europe, Asia Pacific) requires a separate workspace to meet regional compliance and data sovereignty.
- ✅ **Key Takeaways**
  - **Correct Answer:** Three workspaces
  - **Reasoning:** Each geography needs its own workspace for compliance and sovereignty.
  - **Why not fewer (e.g., one)?** Would violate compliance and sovereignty requirements.
  - **Why not more (e.g., five or six)?** Increases costs and administrative overhead unnecessarily.

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** Hybrid Identity Solution: On-premises AD and Microsoft Entra

**Summary:** Recommended authentication method and considerations for integrating on-premises Active Directory with Microsoft Entra.

**Key Points:**
- 🔑 **Recommended Authentication Method**
  - Use Single Sign-On (SSO) with password hash synchronization.
  - ✅ Seamless authentication from on-premises to Azure services.
  - ✅ Minimizes administrative effort for deployment and maintenance.
- **How It Works**
  - AD stores user passwords as hashes.
  - Microsoft Entra Connect retrieves and re-hashes these passwords.
  - The re-hashed passwords are sent to Microsoft Entra ID.
  - Microsoft Entra ID compares hashes during login to authenticate users.
- ❌ **Methods to Avoid**
  - SSO with pass-through authentication: Requires installing an agent on-premises.
  - Federation (with or without password hash sync): Requires deploying and maintaining additional software like AD FS.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Enforcing Organizational Standards and Compliance with Azure Policy

**Summary:** Azure Policy is the solution for defining, enforcing, and remediating organizational standards across Azure resources.

**Key Points:**
- ✅ Define and enforce rules across subscriptions
- ✅ Continuously assess compliance
- ✅ Remediate existing resources in bulk
- ✅ Automatically remediate new resources upon creation
- Other options (Managed Identities, ARM templates, Conditional Access) do not meet all these requirements.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Managing Access in Microsoft Entra ID with PIM

**Summary:** Key recommendations for secure access management in Microsoft Entra ID using granular roles and Privileged Identity Management (PIM).

**Key Points:**
- 🔐 Assign granular roles based on responsibilities; avoid broad access like Global Administrator.
- Use Privileged Identity Management (PIM) for just-in-time (JIT) and time-bound access to elevated roles.
- ❌ Managed Identities are for resource-to-resource access, not user access control.
- ❌ Conditional Access Policies are for remote/BYOD scenarios, not privileged role management.

**Date Learned:** 2025-08-16

---

## Design data storage solutions (20–25%)

<!-- Add related entries below -->

### Entry

**Topic:** Azure Storage Account Services & Encryption

**Summary:** Azure Storage Account provides Blob, File, Table, and Queue storage with built-in encryption.

**Key Points:**
- All storage types encrypt data at rest by default.
- Blob and File storage support customer-managed keys.
- Table and Queue storage support customer-managed keys with account-scoped keys.

| Service      | Description                | Customer-Managed Keys |
|--------------|---------------------------|-----------------------|
| Blob         | Object storage             | ✅ Yes                |
| Files        | File shares (SMB/NFS)      | ✅ Yes                |
| Table        | NoSQL key-value store      | ✅ With account-scoped|
| Queue        | Messaging store            | ✅ With account-scoped|

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** Virtualizing External Data with PolyBase

**Summary:** PolyBase enables SQL Server to query external data sources directly, avoiding ETL and data movement.

**Key Points:**
- PolyBase virtualizes external data for direct querying.
- Supports relational and non-relational sources.
- No ETL required; meets requirements to avoid data movement.
- Alternatives (ADF integration runtime, Azure Files, Cosmos DB change feed) require ETL or don't support direct SQL querying.

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** Publishing Delta Live Tables to Unity Catalog for Databricks SQL

**Summary:** How to make Delta Live Tables accessible to other teams via Databricks SQL using Unity Catalog.

**Key Points:**
- ✅ Specify a schema name in the pipeline settings to define where tables are stored and make them queryable via Unity Catalog.
- ✅ Define a catalog where the pipeline can persist tables; Unity Catalog organizes data assets for governance and SQL access.
- ❌ Incorrect actions:
  - Setting the target value in a JSON configuration file does not support Unity Catalog publishing.
  - Creating a shared access signature (SAS) for tables is for Azure Storage, not Databricks table access.
  - Configuring strong consistency applies to Cosmos DB, not Databricks or Unity Catalog.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Configuring Azure Storage for Log Data

**Summary:** Recommendation for storing log data in Azure to meet requirements for cost, latency, redundancy, and long-term retention.

**Key Points:**
- 🗂️ Use a General-purpose v2 storage account:
  - Supports blob storage and access tiers (e.g., cool tier for lower costs and acceptable latency).
  - Supports Zone-Redundant Storage (ZRS) for high availability.
- ❌ Avoid:
  - General-purpose v1: No access tiers or ZRS.
  - BlockBlobStorage: Premium only, no access tiers, less cost-effective.
  - FileStorage: No blob storage support.
- 📊 Scenario Requirements:
  - Long-term storage (≥180 days), periodic analysis, minimize latency/costs, support ZRS.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Real-Time Analytics and Machine Learning with Azure Databricks

**Summary:** Azure Databricks is recommended for real-time analytics and machine learning on large, diverse datasets across cloud and on-premises sources.

**Key Points:**
- ✅ Supports both batch and real-time data processing.
- ✅ Integrates with Event Hubs or IoT Hub for real-time ingestion.
- ✅ Enables machine learning model training within the workspace.
- ✅ Built on Apache Spark for large-scale analytics.
- ❌ Alternatives not recommended:
  - Azure Data Lake: Storage only, no analytics.
  - Azure Data Factory: Data movement/transformation, lacks real-time and ML.
  - Azure Stream Analytics: Real-time insights, but no ML model training.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Shared Access Signatures (SAS) for Azure Storage

**Summary:** Key design principles and configuration guidelines for using Shared Access Signatures (SAS) with Azure Storage.

**Key Points:**
- 🔐 SAS Design Principles:
  - Protocol Restrictions: SAS supports restricting access to HTTPS or both HTTPS and HTTP. SSH is not supported.
  - Granular Access Control: Enables fine-grained security for Azure Storage resources (files, blobs, tables, queues).
  - URI-Based Access: Each SAS generates a URI with permissions, expiry, and restrictions; shareable securely without exposing storage account keys.
- 📁 Configuration Guidelines:
  - Single SAS for Multiple Resources: You can configure a single SAS to protect multiple files and blobs together.
  - Expiration and Time Zone: Always specify an expiration date and time zone-specific time to automate access control and avoid manual intervention.

**Date Learned:** 2025-08-16
**Key Points:**
- Manual scaling allows you to increase/decrease instance count.
- Autoscale can be configured based on CPU, memory, or schedule.
- Scaling impacts cost and performance.

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** When to Use Azure Traffic Manager

**Summary:** Azure Traffic Manager is best for global distribution, performance optimization, high availability, low maintenance, and load balancing for large-scale apps.

**Key Points:**
- 🌍 Global Distribution: Connects users to the nearest datacenter for multi-region apps.
- ⚡ Performance Optimization: Routes requests based on geographic proximity for faster load times.
- 🛡️ High Availability: Resilient against regional failures and datacenter outages.
- 🔧 Low Maintenance: Automated traffic routing and failover reduce admin effort.
- 🔄 Load Balancing: DNS-based routing balances traffic across endpoints.
- ✅ Best for large-scale, globally distributed apps needing performance, uptime, and simplicity.

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** B-series VMs CPU Credit Model

**Summary:** B-series VMs use a CPU credit model to manage performance and cost efficiency.

**Key Points:**
- When the VM runs below its baseline CPU usage, it accumulates credits.
- Credits allow the VM to burst above the baseline, up to 100% of the vCPU, by spending those credits.
- Once credits are exhausted, performance reverts to the baseline until more credits are earned.

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** Choosing a Container Hosting Service for Microservices

**Summary:** AKS is best for hosting microservices due to managed orchestration, independent service deployment, and easy communication.

**Key Points:**
- AKS: Managed Kubernetes, ideal for microservices, minimal operational overhead.
- ACI: For standalone containers, lacks orchestration.
- Web App for Containers: For web apps, limited service communication.
- Service Fabric: Supports microservices, but complex to manage.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Designing Secure Azure Migration Connectivity

**Summary:** Key requirements and recommended tasks for securely migrating workloads to Azure with high bandwidth and low latency.

**Key Points:**
- 🔑 **Summary of Requirements**
  - No data transfer over public internet
  - Minimum 5 Gbps bandwidth
  - Low latency
- ✅ **Recommended Tasks**
  - Implement Azure ExpressRoute: Private, high-bandwidth (up to 10 Gbps) connectivity to Azure; avoids public internet, enhances security, reduces latency.
  - Implement Private Link: Ensures data stays within Microsoft’s network infrastructure; adds secure connectivity between on-premises and Azure services.
- ❌ **Tasks to Avoid**
  - P2S VPN Gateway: Only suitable for single endpoint connections, not scalable.
  - Virtual Network Service Endpoint: Works within Azure, not for on-premises to cloud.
  - Private Endpoint (alone): Not sufficient without ExpressRoute; used as part of a broader setup.

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** Azure Network Solutions for Multi-Tier Applications

**Summary:** Recommended Azure services for load balancing and routing in a multi-tier application architecture.

**Key Points:**
- 🌐 **Front-End Load Balancing**
  - Use Azure Front Door for internet-facing web application servers.
  - Operates globally, routes traffic via Microsoft's edge network.
  - Best for interregional and internet-facing scenarios.
- 🧭 **Middle-Tier Routing**
  - Use Azure Application Gateway for routing based on HTTP attributes (Layer 7).
  - Ideal for content-based routing (e.g., `/videos/*`, `/images/*`) within a single region.
  - Supports intra-region load balancing.
- ❌ Not Recommended:
  - Azure Load Balancer: Layer 4, IP-based routing, not suitable for content-based routing.
  - Azure Traffic Manager: DNS-based, for geo-distributed apps.
  - Azure Front Door (for middle tier): Designed for cross-region, not ideal for intra-region routing.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Monitoring Azure Kubernetes Service (AKS) with Container Insights

**Summary:** Container insights is the recommended solution for monitoring AKS clusters, providing comprehensive metrics and integration options.

**Key Points:**
- ✅ Container insights:
  - Monitors node memory and processor usage.
  - Tracks pod and deployment health.
  - Alerts when persistent volumes exceed 80% usage.
  - Visualizes metrics and dashboards in Azure Portal.
  - Integrates with external tools like Prometheus and Grafana.
- ❌ Not Recommended:
  - VM insights: For VMs, not AKS pods or volumes.
  - Application Insights: For app performance/user behavior, not AKS infrastructure.
  - Grafana: Visualization only; needs data source like Container insights.

**Date Learned:** 2025-08-16

---

## Design data storage solutions (20–25%)

<!-- Add related entries below -->

### Entry

**Topic:** Azure Storage Account Services & Encryption

**Summary:** Azure Storage Account provides Blob, File, Table, and Queue storage with built-in encryption.

**Key Points:**
- All storage types encrypt data at rest by default.
- Blob and File storage support customer-managed keys.
- Table and Queue storage support customer-managed keys with account-scoped keys.

| Service      | Description                | Customer-Managed Keys |
|--------------|---------------------------|-----------------------|
| Blob         | Object storage             | ✅ Yes                |
| Files        | File shares (SMB/NFS)      | ✅ Yes                |
| Table        | NoSQL key-value store      | ✅ With account-scoped|
| Queue        | Messaging store            | ✅ With account-scoped|

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** Virtualizing External Data with PolyBase

**Summary:** PolyBase enables SQL Server to query external data sources directly, avoiding ETL and data movement.

**Key Points:**
- PolyBase virtualizes external data for direct querying.
- Supports relational and non-relational sources.
- No ETL required; meets requirements to avoid data movement.
- Alternatives (ADF integration runtime, Azure Files, Cosmos DB change feed) require ETL or don't support direct SQL querying.

**Date Learned:** 2025-08-15

---

### Entry

**Topic:** Publishing Delta Live Tables to Unity Catalog for Databricks SQL

**Summary:** How to make Delta Live Tables accessible to other teams via Databricks SQL using Unity Catalog.

**Key Points:**
- ✅ Specify a schema name in the pipeline settings to define where tables are stored and make them queryable via Unity Catalog.
- ✅ Define a catalog where the pipeline can persist tables; Unity Catalog organizes data assets for governance and SQL access.
- ❌ Incorrect actions:
  - Setting the target value in a JSON configuration file does not support Unity Catalog publishing.
  - Creating a shared access signature (SAS) for tables is for Azure Storage, not Databricks table access.
  - Configuring strong consistency applies to Cosmos DB, not Databricks or Unity Catalog.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Configuring Azure Storage for Log Data

**Summary:** Recommendation for storing log data in Azure to meet requirements for cost, latency, redundancy, and long-term retention.

**Key Points:**
- 🗂️ Use a General-purpose v2 storage account:
  - Supports blob storage and access tiers (e.g., cool tier for lower costs and acceptable latency).
  - Supports Zone-Redundant Storage (ZRS) for high availability.
- ❌ Avoid:
  - General-purpose v1: No access tiers or ZRS.
  - BlockBlobStorage: Premium only, no access tiers, less cost-effective.
  - FileStorage: No blob storage support.
- 📊 Scenario Requirements:
  - Long-term storage (≥180 days), periodic analysis, minimize latency/costs, support ZRS.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Real-Time Analytics and Machine Learning with Azure Databricks

**Summary:** Azure Databricks is recommended for real-time analytics and machine learning on large, diverse datasets across cloud and on-premises sources.

**Key Points:**
- ✅ Supports both batch and real-time data processing.
- ✅ Integrates with Event Hubs or IoT Hub for real-time ingestion.
- ✅ Enables machine learning model training within the workspace.
- ✅ Built on Apache Spark for large-scale analytics.
- ❌ Alternatives not recommended:
  - Azure Data Lake: Storage only, no analytics.
  - Azure Data Factory: Data movement/transformation, lacks real-time and ML.
  - Azure Stream Analytics: Real-time insights, but no ML model training.

**Date Learned:** 2025-08-16

---

### Entry

**Topic:** Shared Access Signatures (SAS) for Azure Storage

**Summary:** SAS provides secure, granular, and time-bound access to Azure Storage resources using URI-based permissions.

**Key Points:**
- 🔐 SAS supports protocol restrictions: HTTPS or HTTPS+HTTP (not SSH).
- Enables fine-grained access control for blobs, files, tables, and queues.
- SAS generates a URI with permissions, expiry, and restrictions; shareable without exposing account keys.
- 📁 Configuration:
  - A single SAS can protect multiple files/blobs.
  - Always specify expiration date and time zone for automated access control.

**Date Learned:** 2025-08-16
