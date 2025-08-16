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

## Design business continuity solutions (15–20%)

<!-- Add related entries below -->

---

## Design infrastructure solutions (30–35%)

<!-- Add related entries below -->

### Entry

**Topic:** Azure App Service Scaling

**Summary:** How to scale Azure App Service using manual and automatic scaling options.

**Key Points:**
- Manual scaling allows you to increase/decrease instance count.
- Autoscale can be configured based on CPU, memory, or schedule.
- Scaling impacts cost and performance.

**Date Learned:** 2025-08-15


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

**Date Learned:** 2025-08-15
