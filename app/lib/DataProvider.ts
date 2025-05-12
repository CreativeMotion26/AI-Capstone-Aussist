// Type for raw symptoms JSON entries
export type RawSymptoms = Record<string, {
    English: string;
    Korean: string;
    Vietnamese: string;
}>;

// Type for raw SymptomToConditions JSON entries
export type RawConditions = Record<string, {
    Symptom: string;
    English: string[];
    Korean: string[];
    Vietnamese: string[];
}>;

// Processed Symptom interface
export interface Symptom {
    code: string;       // unique symptom code from JSON key
    english: string;    // English label
    korean: string;     // Korean label
    vietnamese: string; // Vietnamese label
}

// Processed ConditionsMapping interface
export interface ConditionsMapping {
    code: string;         // symptom code from JSON key
    symptom: string;      // symptom description
    english: string[];    // possible conditions in English
    korean: string[];     // possible conditions in Korean
    vietnamese: string[]; // possible conditions in Vietnamese
}

// ====================================================================
// Now load & map the raw JSON into these interfaces
// ====================================================================

import rawSymptomsJson from '@/assets/data/Symptoms.json';
import rawConditionsJson from '@/assets/data/SymptomToConditions.json';

const rawSymptoms = rawSymptomsJson as RawSymptoms;
const rawConditions = rawConditionsJson as RawConditions;

// Convert rawSymptoms -> Symptom[]
export const symptoms: Symptom[] = Object.entries(rawSymptoms).map(
    ([code, { English, Korean, Vietnamese }]) => ({
        code,
        english: English,
        korean: Korean,
        vietnamese: Vietnamese
    })
);

// Convert rawConditions -> ConditionsMapping[]
export const conditionsMappings: ConditionsMapping[] = Object.entries(rawConditions).map(
    ([code, { Symptom, English, Korean, Vietnamese }]) => ({
        code,
        symptom: Symptom,
        english: English,
        korean: Korean,
        vietnamese: Vietnamese
    })
);
