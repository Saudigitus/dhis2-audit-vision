export const RESOURCE_MAPPING: Record<string, { resource: string, fields: string[] }> = {
    // Programs & Data Sets
    program: { resource: 'programs', fields: ['id', 'displayName', 'programType', 'programStages'] },
    dataSet: { resource: 'dataSets', fields: ['id', 'displayName', 'periodType', 'dataSetElements'] },
    dataSetElement: { resource: 'dataSetElements', fields: ['id', 'displayName'] },
    
    // Data Elements & Indicators
    dataElement: { resource: 'dataElements', fields: ['id', 'displayName', 'valueType'] },
    dataElementGroup: { resource: 'dataElementGroups', fields: ['id', 'displayName'] },
    dataElementGroupSet: { resource: 'dataElementGroupSets', fields: ['id', 'displayName'] },
    indicator: { resource: 'indicators', fields: ['id', 'displayName', 'indicatorType'] },
    indicatorGroup: { resource: 'indicatorGroups', fields: ['id', 'displayName'] },
    indicatorGroupSet: { resource: 'indicatorGroupSets', fields: ['id', 'displayName'] },
    indicatorType: { resource: 'indicatorTypes', fields: ['id', 'displayName'] },
    programIndicator: { resource: 'programIndicators', fields: ['id', 'displayName'] },
    programIndicatorGroup: { resource: 'programIndicatorGroups', fields: ['id', 'displayName'] },
    
    // Tracker
    trackedEntityType: { resource: 'trackedEntityTypes', fields: ['id', 'displayName'] },
    trackedEntityAttribute: { resource: 'trackedEntityAttributes', fields: ['id', 'displayName'] },
    trackedEntityAttributeGroup: { resource: 'trackedEntityAttributeGroups', fields: ['id', 'displayName'] },
    trackedEntityInstanceFilter: { resource: 'trackedEntityInstanceFilters', fields: ['id', 'displayName'] },
    programStage: { resource: 'programStages', fields: ['id', 'displayName'] },
    programStageInstance: { resource: 'events', fields: ['id', 'event'] },
    programStageDataElement: { resource: 'programStageDataElements', fields: ['id', 'displayName'] },
    programSection: { resource: 'programSections', fields: ['id', 'displayName'] },
    programStageSection: { resource: 'programStageSections', fields: ['id', 'displayName'] },
    programTrackedEntityAttribute: { resource: 'programTrackedEntityAttributes', fields: ['id', 'displayName'] },
    relationshipType: { resource: 'relationshipTypes', fields: ['id', 'displayName'] },
    trackedEntityInstance: { resource: 'trackedEntityInstances', fields: ['id', 'attributes'] },
    enrollment: { resource: 'enrollments', fields: ['id', 'enrollmentDate'] },
    
    // Organisation Units
    organisationUnit: { resource: 'organisationUnits', fields: ['id', 'displayName', 'level', 'path'] },
    organisationUnitGroup: { resource: 'organisationUnitGroups', fields: ['id', 'displayName'] },
    organisationUnitGroupSet: { resource: 'organisationUnitGroupSets', fields: ['id', 'displayName'] },
    organisationUnitLevel: { resource: 'organisationUnitLevels', fields: ['id', 'displayName', 'level'] },
    
    // Categories & Options
    category: { resource: 'categories', fields: ['id', 'displayName'] },
    categoryOption: { resource: 'categoryOptions', fields: ['id', 'displayName'] },
    categoryCombo: { resource: 'categoryCombos', fields: ['id', 'displayName'] },
    categoryOptionGroup: { resource: 'categoryOptionGroups', fields: ['id', 'displayName'] },
    categoryOptionGroupSet: { resource: 'categoryOptionGroupSets', fields: ['id', 'displayName'] },
    categoryOptionCombo: { resource: 'categoryOptionCombos', fields: ['id', 'displayName'] },
    optionSet: { resource: 'optionSets', fields: ['id', 'displayName', 'options[id,displayName]'] },
    option: { resource: 'options', fields: ['id', 'displayName', 'code'] },
    optionGroup: { resource: 'optionGroups', fields: ['id', 'displayName'] },
    optionGroupSet: { resource: 'optionGroupSets', fields: ['id', 'displayName'] },
    
    // Forms & Sections
    dataEntryForm: { resource: 'dataEntryForms', fields: ['id', 'displayName', 'name'] },
    section: { resource: 'sections', fields: ['id', 'displayName'] },
    
    // Users
    user: { resource: 'users', fields: ['id', 'displayName', 'username'] },
    userGroup: { resource: 'userGroups', fields: ['id', 'displayName'] },
    userRole: { resource: 'userRoles', fields: ['id', 'displayName'] },
    userAuthorityGroup: { resource: 'userRoles', fields: ['id', 'displayName'] },
    
    // Analysis & Reports
    visualization: { resource: 'visualizations', fields: ['id', 'displayName', 'type'] },
    map: { resource: 'maps', fields: ['id', 'displayName'] },
    dashboard: { resource: 'dashboards', fields: ['id', 'displayName'] },
    dashboardItem: { resource: 'dashboardItems', fields: ['id'] },
    report: { resource: 'reports', fields: ['id', 'displayName'] },
    reportTable: { resource: 'reportTables', fields: ['id', 'displayName'] },
    chart: { resource: 'charts', fields: ['id', 'displayName'] },
    sqlView: { resource: 'sqlViews', fields: ['id', 'displayName', 'type'] },
    legendSet: { resource: 'legendSets', fields: ['id', 'displayName'] },
    colorSet: { resource: 'colorSets', fields: ['id', 'displayName'] },
    
    // Rules & Validation
    programRule: { resource: 'programRules', fields: ['id', 'displayName'] },
    programRuleVariable: { resource: 'programRuleVariables', fields: ['id', 'displayName'] },
    programRuleAction: { resource: 'programRuleActions', fields: ['id', 'displayName'] },
    validationRule: { resource: 'validationRules', fields: ['id', 'displayName'] },
    validationRuleGroup: { resource: 'validationRuleGroups', fields: ['id', 'displayName'] },
    predictor: { resource: 'predictors', fields: ['id', 'displayName'] },
    predictorGroup: { resource: 'predictorGroups', fields: ['id', 'displayName'] },
    
    // System & Integration
    eventHook: { resource: 'eventHooks', fields: ['id', 'displayName', 'name'] },
    jobConfiguration: { resource: 'jobConfigurations', fields: ['id', 'displayName', 'name', 'jobType'] },
    pushAnalysis: { resource: 'pushAnalysis', fields: ['id', 'displayName'] },
    metadataVersion: { resource: 'metadataVersions', fields: ['id', 'name'] },
    smsCommand: { resource: 'smsCommands', fields: ['id', 'name'] },
    analyticsTableHook: { resource: 'analyticsTableHooks', fields: ['id', 'name'] },
    
    // Other
    attribute: { resource: 'attributes', fields: ['id', 'displayName'] },
    route: { resource: 'routes', fields: ['id', 'displayName'] },
    constant: { resource: 'constants', fields: ['id', 'displayName'] },
    document: { resource: 'documents', fields: ['id', 'displayName'] },
    interpretation: { resource: 'interpretations', fields: ['id', 'name'] },
    externalMapLayer: { resource: 'externalMapLayers', fields: ['id', 'displayName'] },
    dataApprovalLevel: { resource: 'dataApprovalLevels', fields: ['id', 'displayName'] },
    dataApprovalWorkflow: { resource: 'dataApprovalWorkflows', fields: ['id', 'displayName'] },
    minMaxDataElement: { resource: 'minMaxDataElements', fields: ['id'] },
};

/**
 * Helper to normalize item type for mapping lookup.
 * Handles case-sensitivity and pluralization common in DHIS2 audits.
 */
export const getMappingKey = (type: string) => {
    const lower = type.toLowerCase();
    
    // Exact match in lowercase for common types
    const key = Object.keys(RESOURCE_MAPPING).find(k => k.toLowerCase() === lower);
    if (key) return key;
    
    // Handle pluralization (e.g., dataElements -> dataElement)
    if (lower.endsWith('s')) {
        const singular = lower.slice(0, -1);
        const singularKey = Object.keys(RESOURCE_MAPPING).find(k => k.toLowerCase() === singular);
        if (singularKey) return singularKey;
    }
    
    return type;
};
