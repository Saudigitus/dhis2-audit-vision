export const RESOURCE_MAPPING: Record<string, { resource: string, fields: string[] }> = {
    // Programs & Data Sets
    program: { resource: 'programs', fields: ['id', 'displayName', 'programType', 'programStages'] },
    dataSet: { resource: 'dataSets', fields: ['id', 'displayName', 'periodType', 'dataSetElements'] },
    
    // Data Elements & Indicators
    dataElement: { resource: 'dataElements', fields: ['id', 'displayName', 'valueType'] },
    dataElementGroup: { resource: 'dataElementGroups', fields: ['id', 'displayName'] },
    indicator: { resource: 'indicators', fields: ['id', 'displayName', 'indicatorType'] },
    indicatorGroup: { resource: 'indicatorGroups', fields: ['id', 'displayName'] },
    indicatorType: { resource: 'indicatorTypes', fields: ['id', 'displayName'] },
    programIndicator: { resource: 'programIndicators', fields: ['id', 'displayName'] },
    
    // Tracker
    trackedEntityType: { resource: 'trackedEntityTypes', fields: ['id', 'displayName'] },
    trackedEntityAttribute: { resource: 'trackedEntityAttributes', fields: ['id', 'displayName'] },
    programStage: { resource: 'programStages', fields: ['id', 'displayName'] },
    relationshipType: { resource: 'relationshipTypes', fields: ['id', 'displayName'] },
    
    // Organisation Units
    organisationUnit: { resource: 'organisationUnits', fields: ['id', 'displayName', 'level', 'path'] },
    organisationUnitGroup: { resource: 'organisationUnitGroups', fields: ['id', 'displayName'] },
    organisationUnitLevel: { resource: 'organisationUnitLevels', fields: ['id', 'displayName', 'level'] },
    
    // Categories & Options
    category: { resource: 'categories', fields: ['id', 'displayName'] },
    categoryOption: { resource: 'categoryOptions', fields: ['id', 'displayName'] },
    categoryCombo: { resource: 'categoryCombos', fields: ['id', 'displayName'] },
    categoryOptionGroup: { resource: 'categoryOptionGroups', fields: ['id', 'displayName'] },
    optionSet: { resource: 'optionSets', fields: ['id', 'displayName', 'options[id,displayName]'] },
    option: { resource: 'options', fields: ['id', 'displayName', 'code'] },
    
    // Users
    user: { resource: 'users', fields: ['id', 'displayName', 'username'] },
    userGroup: { resource: 'userGroups', fields: ['id', 'displayName'] },
    userRole: { resource: 'userRoles', fields: ['id', 'displayName'] },
    
    // Analysis & Reports
    visualization: { resource: 'visualizations', fields: ['id', 'displayName', 'type'] },
    map: { resource: 'maps', fields: ['id', 'displayName'] },
    dashboard: { resource: 'dashboards', fields: ['id', 'displayName'] },
    report: { resource: 'reports', fields: ['id', 'displayName'] },
    sqlView: { resource: 'sqlViews', fields: ['id', 'displayName', 'type'] },
    legendSet: { resource: 'legendSets', fields: ['id', 'displayName'] },
    
    // Rules & Validation
    programRule: { resource: 'programRules', fields: ['id', 'displayName'] },
    programRuleVariable: { resource: 'programRuleVariables', fields: ['id', 'displayName'] },
    programRuleAction: { resource: 'programRuleActions', fields: ['id', 'displayName'] },
    validationRule: { resource: 'validationRules', fields: ['id', 'displayName'] },
    validationRuleGroup: { resource: 'validationRuleGroups', fields: ['id', 'displayName'] },
    
    // Other
    attribute: { resource: 'attributes', fields: ['id', 'displayName'] },
    constant: { resource: 'constants', fields: ['id', 'displayName'] },
    document: { resource: 'documents', fields: ['id', 'displayName'] },
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
