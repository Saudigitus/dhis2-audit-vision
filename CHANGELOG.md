# Changelog

All notable changes to DHIS2 Audit Vision will be documented in this file.

## [1.7.0](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.6.0...v1.7.0) (2026-06-05)


### 🐛 Bug Fixes

* restrict public access to read-only for configs ([cfc7d4c](https://github.com/Saudigitus/dhis2-audit-vision/commit/cfc7d4c1a6a20d28566cd9db2d93bf64609dfaac))


### ♻️ Code Refactoring

* clean up config, simplify router and refactor auth util ([f26d573](https://github.com/Saudigitus/dhis2-audit-vision/commit/f26d573d061d04b9d56a40a967eb448c13c237e0))


### 📝 Documentation

* **configuration:** add admin group docs and update config pages ([18ea77a](https://github.com/Saudigitus/dhis2-audit-vision/commit/18ea77a06b4acbb0bc55b1d4c527ca8eb0195f3a))


### ✨ New Features

* **audit:** add admin group and secure audit resources ([2a60124](https://github.com/Saudigitus/dhis2-audit-vision/commit/2a60124c7bdffb41681057c6fbffe7e6e906bee5))
* **user-access:** add read-only viewer user group support ([6b2d6ab](https://github.com/Saudigitus/dhis2-audit-vision/commit/6b2d6ab08870f0344950b6000f71bc425def3dac))

## [1.6.0](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.5.2...v1.6.0) (2026-06-04)


### 🐛 Bug Fixes

* **useGetUserAuthorities:** add fields param to me query ([1657851](https://github.com/Saudigitus/dhis2-audit-vision/commit/1657851f56d82a0099bb56922d82433b5d82a327))


### ♻️ Code Refactoring

* **auth:** add permission checks and refactor auth state ([93c2f14](https://github.com/Saudigitus/dhis2-audit-vision/commit/93c2f1410a03fa12425fcf80f0e69ae02b9a1bc7))


### ✨ New Features

* **auth:** add authorization checks and access control flows ([19dbac1](https://github.com/Saudigitus/dhis2-audit-vision/commit/19dbac11d586ac7c18800d623e3cb7e64cdad8b8))
* **eventHooks:** add authenticated event hook integration ([2867866](https://github.com/Saudigitus/dhis2-audit-vision/commit/28678661e3743755451db723e34e09831a8f4216))
* **user-authorities:** add user authorities fetch and state management ([573a516](https://github.com/Saudigitus/dhis2-audit-vision/commit/573a516f724e1d906e707bd68b8b1887319ca32a))

### [1.5.2](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.5.1...v1.5.2) (2026-06-02)


### 🐛 Bug Fixes

* improve app initialization and clean up code ([9b17514](https://github.com/Saudigitus/dhis2-audit-vision/commit/9b1751494e9e8164027ea70c08fe0a13aa120f73))

### [1.5.1](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.5.0...v1.5.1) (2026-06-02)


### 🐛 Bug Fixes

* **hooks:** add rollback alerts and error handling ([681bf11](https://github.com/Saudigitus/dhis2-audit-vision/commit/681bf11dd5a28f630e7e8c26f1e5e5eab79be45e))

## [1.5.0](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.4.0...v1.5.0) (2026-06-02)


### ♻️ Code Refactoring

* **initializer, progress:** fix async issues and clean up code in hooks and components ([63c7eb8](https://github.com/Saudigitus/dhis2-audit-vision/commit/63c7eb8aff2b390875f5954ddf80fef577511315))
* migrate API calls to dhis2 app-runtime ([bf26d04](https://github.com/Saudigitus/dhis2-audit-vision/commit/bf26d040f7bc65109719389ae804ff58344f5fed))
* update progress tracking and add spinner ([c3dba4e](https://github.com/Saudigitus/dhis2-audit-vision/commit/c3dba4ee7c7c18c707725e5ef70880e157014202))
* update severity rules fetch, add notifications route ([22bc47b](https://github.com/Saudigitus/dhis2-audit-vision/commit/22bc47b260978b3bf30a223134662e7dd3cc1a05))


### ✨ New Features

* add CopyJsonButton to error display for manual configuration in Settings page ([38e4521](https://github.com/Saudigitus/dhis2-audit-vision/commit/38e45215a1c3029855bf61963744bd2b0776724d))
* add id field to routes and assign unique ids ([5158c2f](https://github.com/Saudigitus/dhis2-audit-vision/commit/5158c2f39f73fe5f515957af4fb26f311677f07a))
* add route resource and update dev proxy ([c6528ee](https://github.com/Saudigitus/dhis2-audit-vision/commit/c6528ee85182f276ab22f5b957f65ef9a354f501))
* **audit-api:** add bearer token auth support ([6d9bca0](https://github.com/Saudigitus/dhis2-audit-vision/commit/6d9bca080f99a44f89b9548c1904223708629eb0))
* implement global error handling system with dedicated modal and error reporting hooks ([fbefa01](https://github.com/Saudigitus/dhis2-audit-vision/commit/fbefa01ddcdbc16a4fe3ff993233301752a3bfc8))
* **settings:** add audit API token config and validation ([d5a2ca5](https://github.com/Saudigitus/dhis2-audit-vision/commit/d5a2ca5a23bee07c9f0f82c93a4c3154e4eb102a))


### 📝 Documentation

* add API routes management docs and update related config guides ([1536e43](https://github.com/Saudigitus/dhis2-audit-vision/commit/1536e43cbfb9983be6fd9eaa65a503a70c31b7c5))

## [1.4.0](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.3.0...v1.4.0) (2026-06-01)


### ✨ New Features

* add centralized error tracking and update dev proxy ([a329a4e](https://github.com/Saudigitus/dhis2-audit-vision/commit/a329a4ebe38c662500074c261fd62de8f9d2a7bf))
* add error reporting modal and summary banner to Settings page to display system configuration issues ([d14834b](https://github.com/Saudigitus/dhis2-audit-vision/commit/d14834ba2cdbe902ba0722761bca2a2d75d37e63))
* **initializer:** add progress tracking for app initialization ([3785a04](https://github.com/Saudigitus/dhis2-audit-vision/commit/3785a042b1724bfe848e76d29a860e5c264b4e65))

## [1.3.0](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.2.1...v1.3.0) (2026-05-28)


### ✨ New Features

* **audit hooks:** add display names to aggrouped audit items ([aba956a](https://github.com/Saudigitus/dhis2-audit-vision/commit/aba956ac61d853d623041e29caa47b360520a235))

### [1.2.1](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.2.0...v1.2.1) (2026-05-28)

## [1.2.0](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.1.4...v1.2.0) (2026-05-27)


### ♻️ Code Refactoring

* **audit:** use centralized resource mappings ([1daa835](https://github.com/Saudigitus/dhis2-audit-vision/commit/1daa83597264a5b7f837ed41bdc6b08f07a6dfc9))


### ✨ New Features

* **audit-drawer:** add display name field ([60bec10](https://github.com/Saudigitus/dhis2-audit-vision/commit/60bec109bf1cbb69dd41f88e8e20d81bd3374b6e))
* **audit:** add audit item metadata enrichment ([e82f025](https://github.com/Saudigitus/dhis2-audit-vision/commit/e82f02599694bb99f276ce2f8f958ba798d45708))
* **audit:** add display name enrichment for audit table entries ([9f1f4a6](https://github.com/Saudigitus/dhis2-audit-vision/commit/9f1f4a669544898c62947709a79e5ba6324300f3))

### [1.1.4](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.1.3...v1.1.4) (2026-05-21)

### [1.1.3](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.1.2...v1.1.3) (2026-05-21)


### 🐛 Bug Fixes

* **tableData:** solved issue when open metadata-grouping ([f4de5ff](https://github.com/Saudigitus/dhis2-audit-vision/commit/f4de5ffdc8c547e41c1ca637e7a2d2ea2ea86e33))

### [1.1.2](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.1.1...v1.1.2) (2026-05-11)


### 🚀 CI/CD

* **release:** update push target branch from main to develop ([0a0f254](https://github.com/Saudigitus/dhis2-audit-vision/commit/0a0f254e39a449ea6969674173a2a43b7781f39a))
* update CI/CD workflows and release tooling ([339c30d](https://github.com/Saudigitus/dhis2-audit-vision/commit/339c30d6605f2c41d2f0b72e5312264ed56f60ed))

### [1.1.1](https://github.com/Saudigitus/dhis2-audit-vision/compare/v1.1.0...v1.1.1) (2026-05-11)


### 🚀 CI/CD

* **release:** update workflow for dynamic release notes ([f49d7cf](https://github.com/Saudigitus/dhis2-audit-vision/commit/f49d7cffd043bcb7ad05e31a9d918a7e384773eb))

## 1.1.0 (2026-05-11)


### Features

* **activity-table:** make table header and action configurable ([fe2a589](https://github.com/Saudigitus/dhis2-audit-vision/commit/fe2a58920e698369738bb66f6c373019b16eb2b0))
* add app wrapper with data store integration and monitoring groups UI ([aed5ec1](https://github.com/Saudigitus/dhis2-audit-vision/commit/aed5ec176f2362d29d7248d861919132e4902069))
* add data-engine dependency and improve change explorer UI ([14a71d4](https://github.com/Saudigitus/dhis2-audit-vision/commit/14a71d4ca220d12bddd64218ade88711d0f3eeb8))
* add event hook initialization and refactor app wrapper ([c1be607](https://github.com/Saudigitus/dhis2-audit-vision/commit/c1be607dd3cd4eaacea967af9ab60bae1c334304))
* add reusable card component system for dashboard ([c57661e](https://github.com/Saudigitus/dhis2-audit-vision/commit/c57661e21512cfc3a04ae0c800b652f49ce95b92))
* add severity rules configuration with backend integration ([9e19a2d](https://github.com/Saudigitus/dhis2-audit-vision/commit/9e19a2db565b6f3186945eb29fa677de2c4b43e3))
* add severity rules management and expand metadata filter options ([438ecc5](https://github.com/Saudigitus/dhis2-audit-vision/commit/438ecc531ad163d9c8263183b8f6b94868757a81))
* add severity rules page and restructure sidebar ([202af50](https://github.com/Saudigitus/dhis2-audit-vision/commit/202af507a0f24df1a7de76570a5c96e250fd0e93))
* add SQL view initialization on app startup ([53810e9](https://github.com/Saudigitus/dhis2-audit-vision/commit/53810e9bdb31069fc0d54e01533c91fa56220ecb))
* add top users changes report and fix data fetching logic ([dbd896b](https://github.com/Saudigitus/dhis2-audit-vision/commit/dbd896b226ba268a6c16ea88b93cd76135efe3a6))
* add users_with_audits SQL view for metadata audit tracking ([9a315e4](https://github.com/Saudigitus/dhis2-audit-vision/commit/9a315e41a46b2f5e8ddc7f3ad2e8d2b15f17e018))
* **audit-table:** add dynamic filtering and loading states ([29c8ca2](https://github.com/Saudigitus/dhis2-audit-vision/commit/29c8ca2477a9b2365e8207d1baa8f635f60fd1f8))
* **audit:** add audit details fetching and improve type safety ([a329dbc](https://github.com/Saudigitus/dhis2-audit-vision/commit/a329dbc31d33209447b249b88342a1f64bf020bc))
* **audit:** add confirm dialog for restore operations ([e33fdc0](https://github.com/Saudigitus/dhis2-audit-vision/commit/e33fdc0d5e3400e89aa975cc89eefa90d37f1a95))
* **audit:** add rollback functionality to diff viewer ([80a7826](https://github.com/Saudigitus/dhis2-audit-vision/commit/80a7826444a2a5250f2440c1b3f45a33c6213ac5))
* **change-explorer:** add metadata group audit view with expandable dependencies ([edac63e](https://github.com/Saudigitus/dhis2-audit-vision/commit/edac63ec07881c3f466c60e32348bea142168456))
* **change-explorer:** add monitoring group support and UI enhancements ([5f47bf5](https://github.com/Saudigitus/dhis2-audit-vision/commit/5f47bf5666a42bcafb207d6c01b1f90448be97d1))
* **change-explorer:** add user filter dropdown and fix pagination ([321afe5](https://github.com/Saudigitus/dhis2-audit-vision/commit/321afe554f261b9f3a6a9af1159d7c760bc27d45))
* **dashboard:** add risk changes calculation and improve data formatting ([773d890](https://github.com/Saudigitus/dhis2-audit-vision/commit/773d8901c7e204d541c8deb1b521c56b1623e924))
* **dashboard:** integrate dynamic data fetching and filtering ([055050f](https://github.com/Saudigitus/dhis2-audit-vision/commit/055050f35c4e84a4ae8dec2cb4a381709f61f96d))
* **diff-viewer:** implement structured diff viewer with collapsible tree UI ([5625111](https://github.com/Saudigitus/dhis2-audit-vision/commit/562511129cdc6640b3b191cf8af2cc3e74c36e2f))
* **diff-viewer:** improve update history selection and UI ([2bd6af0](https://github.com/Saudigitus/dhis2-audit-vision/commit/2bd6af0b4a73ddb07bc3d89c64b9385c5eb65903))
* enhance dashboard with user activity chart and adjust UI spacing ([dfd69c0](https://github.com/Saudigitus/dhis2-audit-vision/commit/dfd69c021b5a5779d3c8a7fb4ac497988bc49ab9))
* enhance severity rules with notification settings ([d443173](https://github.com/Saudigitus/dhis2-audit-vision/commit/d443173503799d86d8c6b960005238b55a056084))
* extract activity table component and define its types ([b1c1ba4](https://github.com/Saudigitus/dhis2-audit-vision/commit/b1c1ba42b97b249e3c33b39af1cf2b2f3ffc6211))
* **filter:** add enter key support to trigger filter ([e40e0a5](https://github.com/Saudigitus/dhis2-audit-vision/commit/e40e0a5534d7ac2c1ef5444d10d1d8cac9c97fd9))
* implement diff viewer and refactor audit data handling ([8a3e140](https://github.com/Saudigitus/dhis2-audit-vision/commit/8a3e140443bbb8af7c7530485c3adc0445640ae7))
* improve change explorer UI and diff functionality ([0bab676](https://github.com/Saudigitus/dhis2-audit-vision/commit/0bab676aea5d0234229cb17641d0b49b06d46e4d))
* initialize React application with DHIS2 audit monitoring UI ([6e27f27](https://github.com/Saudigitus/dhis2-audit-vision/commit/6e27f277b43405aec31d4fc76f01955c8bcffa3b))
* integrate audit API with pagination and data formatting ([a690c8c](https://github.com/Saudigitus/dhis2-audit-vision/commit/a690c8cdeac7272068f67e604891bbdf31c80a15))
* **metadata-grouping:** add group sorting and fix namespace typo ([6b797e2](https://github.com/Saudigitus/dhis2-audit-vision/commit/6b797e25bd706db4269d31105ee9e833508e536c))
* **metadata-grouping:** add metadata grouping page with modal component ([0daf59e](https://github.com/Saudigitus/dhis2-audit-vision/commit/0daf59eac912634320a0c25c967a62878a002a41))
* **monitoring-groups:** add delete functionality with confirmation modal ([750b205](https://github.com/Saudigitus/dhis2-audit-vision/commit/750b20519f1cb55da2ffb258a0f7a902156c674b))
* **monitoring-groups:** add filter tabs to available items modal ([69d3a20](https://github.com/Saudigitus/dhis2-audit-vision/commit/69d3a20bea1495eedc48561b230bbd3982a82884))
* **monitoring-groups:** implement dynamic metadata loading and getting metatada names dynamically ([ed05eb5](https://github.com/Saudigitus/dhis2-audit-vision/commit/ed05eb5c498382ef2c66e0ef4cae66bf23137051))
* **monitoring-groups:** implement save functionality and improve data fetching ([b8d9b9f](https://github.com/Saudigitus/dhis2-audit-vision/commit/b8d9b9f81c3935ded226f6a4026c9dccc8eee490))
* refactor app to use react-router with layout components ([e78aa78](https://github.com/Saudigitus/dhis2-audit-vision/commit/e78aa789335592a873c71343ef9a827d2987da82))
* **rollback:** add loading state and UI feedback for restore operations ([7fa32e8](https://github.com/Saudigitus/dhis2-audit-vision/commit/7fa32e820bd2569f0fc571186f0bd061db5cca4b))
* **settings:** add audit API configuration page ([5cb38c6](https://github.com/Saudigitus/dhis2-audit-vision/commit/5cb38c615b0803bbd38993e05067442a00c2b755))
* **severity-rules:** add delete functionality and improve form handling ([7e04139](https://github.com/Saudigitus/dhis2-audit-vision/commit/7e0413976f0586dac4e7145040193c618fa6c35c))
* **severity-rules:** add filtering and severity column to rules table ([3660261](https://github.com/Saudigitus/dhis2-audit-vision/commit/3660261bbbafaa790149349f1a5d051b89bc2e2b))
* **severity-rules:** implement severity rules management UI and utilities ([cafa329](https://github.com/Saudigitus/dhis2-audit-vision/commit/cafa3298348f16d1488bb70e4fdea7ac7bd473f4))
* **severity-rules:** prevent duplicate rule creation and improve UX ([fe84e1c](https://github.com/Saudigitus/dhis2-audit-vision/commit/fe84e1c612aa040df9d927b0fade1d1621352f00))
* **sidebar:** implement collapsible sidebar and update UI styling ([5ae9992](https://github.com/Saudigitus/dhis2-audit-vision/commit/5ae9992ab614040dc4932ba200e4530978cc0266))
* **system-health:** integrate dynamic system info from API ([abcf42c](https://github.com/Saudigitus/dhis2-audit-vision/commit/abcf42c4080a216572c2646010ac322fa947c03d))
* **table:** add reusable table component with pagination and expandable rows ([c7fd828](https://github.com/Saudigitus/dhis2-audit-vision/commit/c7fd828aaeacf14e187d5e68753a16b62a7cef68))
* temporarily hide unused navigation items and system health page ([f281abd](https://github.com/Saudigitus/dhis2-audit-vision/commit/f281abd849d041710a146e6cd0d22ac4e48539cc))
* **ui:** improve responsive design and loading states across components ([39b5a8c](https://github.com/Saudigitus/dhis2-audit-vision/commit/39b5a8c294ef0b999798eb4f134db5c8b4490e20))
* **users:** dynamically fetch and display top user changes over time ([3aff64b](https://github.com/Saudigitus/dhis2-audit-vision/commit/3aff64b0b27d03837ee4d8006dd7f78f8986fffc))
* **Users:** enhance dashboard with summary cards and activity chart ([3271a97](https://github.com/Saudigitus/dhis2-audit-vision/commit/3271a972a262e1c7355d4499afa5b5fa6869aade))
* **users:** implement bulk user audit with paginated list ([07b8af8](https://github.com/Saudigitus/dhis2-audit-vision/commit/07b8af89173f09d7dcd8b0a5bb1d8fef793aa0d5))
* **users:** implement modular users page with data hooks and components ([061c4af](https://github.com/Saudigitus/dhis2-audit-vision/commit/061c4af58ef02864c4f316ab7dbee96dc4f28e98))
* **users:** implement paginated user listing with audit summary ([c7153d5](https://github.com/Saudigitus/dhis2-audit-vision/commit/c7153d5bd0e0ab9dc338b637d367d66e6edcf2a2))


### Bug Fixes

* adjust UI styles and fix conditional rendering logic ([9cc0089](https://github.com/Saudigitus/dhis2-audit-vision/commit/9cc0089f47f4b94010103f4e412014c173431fd7))
* **app:** prevent infinite loading and fix data initialization ([99c6e50](https://github.com/Saudigitus/dhis2-audit-vision/commit/99c6e50467c6eea8fd39d6ccba2a6cbf994a5053))
* **change-explorer:** swap object and type column values in table ([f8d797a](https://github.com/Saudigitus/dhis2-audit-vision/commit/f8d797a4afb27648e112cb9b059c7f4298b34c28))
* **diff-viewer:** resolve merge conflict in component props ([9e2861f](https://github.com/Saudigitus/dhis2-audit-vision/commit/9e2861f306972402cbcc28bf1938958709b6e45c))
* **drawer:** reset selection after confirming diff restoration ([8a07466](https://github.com/Saudigitus/dhis2-audit-vision/commit/8a074666500aa40123813f8eae90a1b99ed1fe85))
* **drawer:** resolve merge conflict in change explorer drawer ([fa866c3](https://github.com/Saudigitus/dhis2-audit-vision/commit/fa866c343cee46402d63d5f8499e540d93bddaa8))
* handle optional chaining in monitoring groups filter ([7eb78c4](https://github.com/Saudigitus/dhis2-audit-vision/commit/7eb78c405a1730b76e60c8cc206f59f572649911))
* initialize loading states to true and prevent duplicate calls ([9a9362e](https://github.com/Saudigitus/dhis2-audit-vision/commit/9a9362ec8425b49c70af32557b8880fa0a9ed7ac))
* **layout:** adjust sidebar layout for proper scrolling and spacing ([b291c63](https://github.com/Saudigitus/dhis2-audit-vision/commit/b291c636282b22c750f0d5057810899da5d4f500))
* **monitoring-groups:** handle undefined items when editing group ([25c70cf](https://github.com/Saudigitus/dhis2-audit-vision/commit/25c70cf678d5d976b07d7101534934d679d0b928))
* **monitoring-groups:** improve loading states and save error handling ([0ab5055](https://github.com/Saudigitus/dhis2-audit-vision/commit/0ab50556ca3aa74a8c0311d5e0dd888ab49b96b6))
* prevent API calls with invalid date parameters ([864fed4](https://github.com/Saudigitus/dhis2-audit-vision/commit/864fed4b4ad5ee5cf092b1420f2dd15dd081aaf1))
* set filters to be visible by default in change explorer ([101ff2c](https://github.com/Saudigitus/dhis2-audit-vision/commit/101ff2c148af49ced91db2575a32bd62e0212153))
* **severity-rules:** fix contact editing and improve error handling ([7e0603a](https://github.com/Saudigitus/dhis2-audit-vision/commit/7e0603aed15ceadbdfc988dd5d28fa3fcb0bdd89))
* **severity-rules:** handle successful rule creation response ([a2c3b6f](https://github.com/Saudigitus/dhis2-audit-vision/commit/a2c3b6f055a9244270460e604373295c35ce7b86))
* **table:** correct row selection in diff view ([c2d8eae](https://github.com/Saudigitus/dhis2-audit-vision/commit/c2d8eaeb52b7388ef5e6e2ae81ed17956df5ae3e))
* **table:** improve expanded row loading states and UI consistency ([ca32de4](https://github.com/Saudigitus/dhis2-audit-vision/commit/ca32de46866aae26cc08f822b4d8dbd0b00ecaf1))
* update GlobalAuditFilter default state and date formatting ([e63f42a](https://github.com/Saudigitus/dhis2-audit-vision/commit/e63f42ade8dc4efdecb5a8560265683a20a54d8e))
* use correct property for change explorer table data ([a3cfafd](https://github.com/Saudigitus/dhis2-audit-vision/commit/a3cfafdfc6f56e48492f05d9d8d8d65ccac8e758))
* **users:** accumulate audit counts across paginated results ([f9f52ce](https://github.com/Saudigitus/dhis2-audit-vision/commit/f9f52ce8228f8a430b412b518ff3781918411018))

## [1.0.2] - 2026-05-11

### 🚀 CI/CD
- **Workflow**: Add manual trigger to deploy workflow

### 📦 DHIS2 AUDIT VISION – Version 1.0.2 Release Notes

**Release Date:** 2026-05-11

### ✨ New Features

- **Complete Traceability**: Track every change made to DHIS2 metadata with Diff visualization, dependency tracking, and complete audit trails
- **Real-Time Monitoring**: Monitor user activity and system changes in real time
- **Rollback Capability**: Quickly revert accidental or unwanted changes with detailed change history and one-click rollback
- **Automatic Alerts**: Receive intelligent notifications categorized by severity level (High, Medium, Low) when critical changes happen
- **DHIS2 Integration**: Seamless integration with DHIS2 instances (version 2.40+)
- **Dashboard**: Visual overview of system health, user activity, and recent changes
- **Change Explorer**: Detailed view of all metadata changes with filter and search capabilities
- **User Audit**: Monitor user activity and changes made by specific users
- **Severity Rules**: Configure custom alert rules based on severity levels
- **Monitoring Groups**: Organize metadata into monitoring groups for focused tracking
- **Settings Panel**: Configure API URL and other application settings

### 🔧 Technical Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **DHIS2 UI Components**: Integration with @dhis2/ui component library
- **State Management**: Recoil for state management
- **Routing**: React Router DOM for navigation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for UI icons
- **Internationalization**: i18n support with @dhis2/d2-i18n
- **Backend API**: Python-based REST API (separate repository)
- **Database**: PostgreSQL with Alembic migrations
- **Deployment**: Docker support for production deployment

### 📦 Deployment Options

- **Frontend**: DHIS2 custom app bundle
- **Backend API**: 
  - Docker Compose (recommended for production)
  - Manual installation (for development or custom setups)

### 📋 Requirements

- **DHIS2 Instance**: Minimum version 2.40 with auditing enabled
- **Frontend**: Node.js 18+ for development
- **Backend API**: 
  - Python 3.11+
  - PostgreSQL
  - Docker & Docker Compose (optional)

### 📝 Documentation

- Complete README with installation and deployment instructions
- DHIS2 instance configuration guide
- Frontend and backend development guides for contributors

### 🔒 Security

- Integration user with minimum required permissions (F_METADATA_EXPORT, F_AUDIT_READ)
- Automatic SQL View management with compatibility checks
- Secure environment variable configuration

## [1.0.0] - 2026-05-06

### ✨ New Features

- **Complete Traceability**: Track every change made to DHIS2 metadata with Diff visualization, dependency tracking, and complete audit trails
- **Real-Time Monitoring**: Monitor user activity and system changes in real time
- **Rollback Capability**: Quickly revert accidental or unwanted changes with detailed change history and one-click rollback
- **Automatic Alerts**: Receive intelligent notifications categorized by severity level (High, Medium, Low) when critical changes happen
- **DHIS2 Integration**: Seamless integration with DHIS2 instances (version 2.40+)
- **Dashboard**: Visual overview of system health, user activity, and recent changes
- **Change Explorer**: Detailed view of all metadata changes with filter and search capabilities
- **User Audit**: Monitor user activity and changes made by specific users
- **Severity Rules**: Configure custom alert rules based on severity levels
- **Monitoring Groups**: Organize metadata into monitoring groups for focused tracking
- **Security Audit**: Dedicated security monitoring capabilities
- **Trends Analytics**: Visualize change trends over time with charts
- **Settings Panel**: Configure API URL and other application settings

### 🔧 Technical Features

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **DHIS2 UI Components**: Integration with @dhis2/ui component library
- **State Management**: Recoil for state management
- **Routing**: React Router DOM for navigation
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for UI icons
- **Internationalization**: i18n support with @dhis2/d2-i18n
- **Backend API**: Python-based REST API (separate repository)
- **Database**: PostgreSQL with Alembic migrations
- **Deployment**: Docker support for production deployment

### 📦 Deployment Options

- **Frontend**: DHIS2 custom app bundle
- **Backend API**: 
  - Docker Compose (recommended for production)
  - Manual installation (for development or custom setups)

### 📋 Requirements

- **DHIS2 Instance**: Minimum version 2.40 with auditing enabled
- **Frontend**: Node.js 18+ for development
- **Backend API**: 
  - Python 3.11+
  - PostgreSQL
  - Docker & Docker Compose (optional)

### 📝 Documentation

- Complete README with installation and deployment instructions
- DHIS2 instance configuration guide
- Frontend and backend development guides for contributors

### 🔒 Security

- Integration user with minimum required permissions (F_METADATA_EXPORT, F_AUDIT_READ)
- Automatic SQL View management with compatibility checks
- Secure environment variable configuration
