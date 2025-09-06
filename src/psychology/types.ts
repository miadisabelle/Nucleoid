/**
 * Core psychological data structures for the Bonfire Blueprint framework
 * 
 * These types represent the fundamental concepts in psychological reasoning:
 * - Verdicts: Unconscious core beliefs that generate symptoms
 * - Beliefs: Conscious thoughts and self-talk
 * - Behaviors: Observable actions and compensatory strategies
 * - Therapeutic Models: Different approaches to psychological healing
 */

export interface Verdict {
  id: string;
  content: string; // e.g., "I am unlovable", "I am fundamentally flawed"
  type: 'self-worth' | 'capability' | 'belonging' | 'safety' | 'autonomy';
  origin?: string; // early attachment, trauma, etc.
  strength: number; // 0-1, how deeply held
  unconscious: boolean; // whether the person is aware of it
  createdAt: Date;
}

export interface Belief {
  id: string;
  content: string; // surface-level thoughts
  verdict?: string; // ID of underlying verdict if connected
  type: 'negative-self-talk' | 'cognitive-distortion' | 'rational-thought' | 'affirmation';
  distortions?: CognitiveDistortion[];
  frequency: number; // how often this belief surfaces
}

export interface Behavior {
  id: string;
  description: string;
  type: 'compensatory' | 'avoidant' | 'self-sabotage' | 'healthy-coping';
  triggers: string[]; // what situations trigger this behavior
  verdict?: string; // underlying verdict this behavior serves
  effectiveness: number; // 0-1, how well it achieves its purpose
  cost: number; // 0-1, psychological/social cost
}

export interface CognitiveDistortion {
  type: 'all-or-nothing' | 'catastrophizing' | 'mind-reading' | 'fortune-telling' | 
        'emotional-reasoning' | 'should-statements' | 'labeling' | 'personalization';
  description: string;
  example: string;
}

export interface TherapeuticModel {
  id: string;
  name: string;
  category: 'failed-model' | 'exposure-method';
  description: string;
  approach: 'symptom-focused' | 'verdict-exposing';
  effectiveness: number; // 0-1 rating
  limitations: string[];
  biases: string[]; // psychological biases it fails to address
}

export interface TherapeuticIntervention {
  id: string;
  modelId: string;
  target: 'belief' | 'behavior' | 'verdict';
  method: string;
  description: string;
  expectedOutcome: string;
  actualOutcome?: string;
  success: boolean;
  sideEffects?: string[];
}

export interface PsychologicalProfile {
  id: string;
  verdicts: Verdict[];
  beliefs: Belief[];
  behaviors: Behavior[];
  interventions: TherapeuticIntervention[];
  progress: ProgressMetric[];
}

export interface ProgressMetric {
  date: Date;
  verdictStrength: Record<string, number>; // verdict ID -> strength
  symptomFrequency: Record<string, number>; // belief/behavior ID -> frequency
  overallWellbeing: number; // 0-1 scale
  notes: string;
}

export interface BonfireAnalysis {
  profileId: string;
  exposedVerdicts: Verdict[];
  connectedSymptoms: {
    verdictId: string;
    beliefs: Belief[];
    behaviors: Behavior[];
  }[];
  recommendedExposure: {
    verdict: Verdict;
    method: 'downward-arrow' | 'cognitive-defusion' | 'attachment-exploration' | 'structural-tension';
    steps: string[];
  }[];
  avoidRecommendations: string[]; // what NOT to do (failed model approaches)
}

export type PsychologicalConcept = Verdict | Belief | Behavior | TherapeuticModel;