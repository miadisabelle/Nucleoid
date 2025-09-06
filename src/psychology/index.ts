/**
 * Psychology Module - The Bonfire Blueprint Implementation
 * 
 * A neuro-symbolic AI framework for psychological reasoning that exposes
 * underlying "verdicts" (unconscious beliefs) rather than patching symptoms.
 * 
 * This module implements the methodology described in "The Bonfire Blueprint: 
 * Exposing the Verdict" using Nucleoid's declarative runtime and knowledge graph.
 */

// Core types and interfaces
export * from './types';

// Main Bonfire Blueprint methodology
export { BonfireBlueprint } from './blueprint';

// Therapeutic models
export { 
  CognitiveBehavioralTherapy, 
  PositivePsychology, 
  HumanisticTherapy 
} from './models/failed-models';

export { 
  AcceptanceCommitmentTherapy, 
  AttachmentTheory, 
  StructuralTensionApproach 
} from './models/exposure-methods';

// Knowledge graph reasoning engine
export { 
  PsychologicalReasoningEngine, 
  psychologicalReasoning 
} from './reasoning';

// Convenience factory functions
export function createVerdict(
  content: string, 
  type: 'self-worth' | 'capability' | 'belonging' | 'safety' | 'autonomy' = 'self-worth'
) {
  return {
    id: `verdict-${Date.now()}`,
    content,
    type,
    strength: 0.8,
    unconscious: true,
    createdAt: new Date()
  };
}

export function createBelief(
  content: string, 
  type: 'negative-self-talk' | 'cognitive-distortion' | 'rational-thought' | 'affirmation' = 'negative-self-talk'
) {
  return {
    id: `belief-${Date.now()}`,
    content,
    type,
    frequency: 0.7
  };
}

export function createBehavior(
  description: string, 
  type: 'compensatory' | 'avoidant' | 'self-sabotage' | 'healthy-coping' = 'compensatory'
) {
  return {
    id: `behavior-${Date.now()}`,
    description,
    type,
    triggers: [],
    effectiveness: 0.3,
    cost: 0.7
  };
}

/**
 * Quick start function to analyze a simple case
 */
export function quickAnalysis(symptoms: string[]): any {
  const blueprint = new BonfireBlueprint();
  const profile = {
    id: 'quick-analysis',
    verdicts: [],
    beliefs: symptoms.map(symptom => createBelief(symptom)),
    behaviors: [],
    interventions: [],
    progress: []
  };

  return blueprint.analyzePsychologicalProfile(profile);
}

/**
 * Expose a verdict from a single symptom
 */
export function exposeVerdictFromSymptom(symptom: string) {
  const blueprint = new BonfireBlueprint();
  const belief = createBelief(symptom);
  return blueprint.exposeVerdict(belief);
}