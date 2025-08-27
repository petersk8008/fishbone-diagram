export interface Cause {
    reason: string;
    category: string;
};

export interface aiRecommendation {
    explanation: string;
    category: 'People' | 'Method' | 'Machine' | 'Environment' | 'Measurement' | 'Materials';
};

export interface FishboneFormData {
    outcome: string;
    causes: Cause[];
};