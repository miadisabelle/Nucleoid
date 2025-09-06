/**
 * Failed Therapeutic Models - as described in Part 1 of the Bonfire Blueprint
 * 
 * These models attempt to manage or replace negative beliefs rather than
 * excavate and nullify their power. They operate on symptoms, not root causes.
 */

import { TherapeuticModel, TherapeuticIntervention, Belief, Behavior } from '../types';

export class CognitiveBehavioralTherapy implements TherapeuticModel {
  id = 'cbt';
  name = 'Cognitive Behavioral Therapy';
  category: 'failed-model' = 'failed-model';
  description = 'Identifies cognitive distortions and challenges them with evidence, aiming to replace irrational thoughts with rational ones';
  approach: 'symptom-focused' = 'symptom-focused';
  effectiveness = 0.3; // Limited effectiveness due to whack-a-mole effect
  limitations = [
    'Operates on surface level of conscious cognition',
    'Assumes rational brain can argue emotional brain into submission',
    'Creates whack-a-mole effect - defeats specific thoughts but underlying verdict generates new ones',
    'Challenges symptoms of verdict, not the verdict itself'
  ];
  biases = [
    'Fundamental Attribution Error (internalized)',
    'Fails to address stable, internal attributions for negative events'
  ];

  applyIntervention(belief: Belief): TherapeuticIntervention {
    return {
      id: `cbt-${Date.now()}`,
      modelId: this.id,
      target: 'belief',
      method: 'cognitive-restructuring',
      description: `Challenge the cognitive distortion in: "${belief.content}"`,
      expectedOutcome: 'Replace irrational thought with rational alternative',
      success: false, // Will fail to address underlying verdict
      sideEffects: [
        'Whack-a-mole effect - new distorted thoughts emerge',
        'Rational mind vs emotional mind conflict',
        'Temporary relief followed by symptom return'
      ]
    };
  }

  identifyDistortions(belief: Belief): string[] {
    const distortions: string[] = [];
    
    if (belief.content.includes('always') || belief.content.includes('never')) {
      distortions.push('all-or-nothing thinking');
    }
    if (belief.content.includes('terrible') || belief.content.includes('awful')) {
      distortions.push('catastrophizing');
    }
    if (belief.content.includes('everyone thinks')) {
      distortions.push('mind-reading');
    }
    
    return distortions;
  }
}

export class PositivePsychology implements TherapeuticModel {
  id = 'positive-psychology';
  name = 'Positive Psychology & Self-Affirmation';
  category: 'failed-model' = 'failed-model';
  description = 'By consciously affirming positive aspects of the self, one can buffer against threats to self-integrity';
  approach: 'symptom-focused' = 'symptom-focused';
  effectiveness = 0.2; // Often backfires due to cognitive dissonance
  limitations = [
    'Slapping "I\'m worthy" over the rot',
    'Causes cognitive dissonance for those with deep-seated negative verdicts',
    'Brain rejects affirmations as false, strengthening original negative belief',
    'Act of affirming screams "This is not already true!"'
  ];
  biases = [
    'Self-Verification Theory',
    'Ignores fundamental drive to be known and understood, even if self-view is negative',
    'Attacks coherent (if painful) self-view, causing rejection'
  ];

  applyIntervention(belief: Belief): TherapeuticIntervention {
    const affirmation = this.generateAffirmation(belief.content);
    
    return {
      id: `positive-psych-${Date.now()}`,
      modelId: this.id,
      target: 'belief',
      method: 'self-affirmation',
      description: `Apply positive affirmation: "${affirmation}" to counter: "${belief.content}"`,
      expectedOutcome: 'Buffer against threat to self-integrity',
      success: false,
      sideEffects: [
        'Cognitive dissonance between affirmation and core belief',
        'Strengthening of original negative verdict',
        'Rejection of affirmation as "fake" or "not true"'
      ]
    };
  }

  private generateAffirmation(negativeContent: string): string {
    // Generate opposite affirmation - which often fails
    if (negativeContent.includes('worthless')) return 'I am worthy and valuable';
    if (negativeContent.includes('failure')) return 'I am successful and capable';
    if (negativeContent.includes('unlovable')) return 'I am lovable and deserving of love';
    return 'I am enough just as I am';
  }
}

export class HumanisticTherapy implements TherapeuticModel {
  id = 'humanistic-therapy';
  name = 'Humanistic Therapy & Unconditional Positive Regard';
  category: 'failed-model' = 'failed-model';
  description = 'Therapist provides consistent, accepting environment to allow client\'s innate potential for growth';
  approach: 'symptom-focused' = 'symptom-focused';
  effectiveness = 0.4; // More powerful but can be co-opted
  limitations = [
    'Can be co-opted by ideal-belief conflict',
    'Client incorporates "being worthy of therapist\'s approval" into new, subtle ideal',
    'Internal verdict remains untouched',
    'Healing becomes contingent on external source (therapist approval)',
    'Performance of "authenticity" to maintain approval'
  ];
  biases = [
    'Spotlight Effect',
    'Client\'s world still navigated through lens of how they are perceived',
    'Keeps spotlight on self-concept, even if positive',
    'Core verdict of being judged remains active'
  ];

  applyIntervention(belief: Belief): TherapeuticIntervention {
    return {
      id: `humanistic-${Date.now()}`,
      modelId: this.id,
      target: 'behavior', // Often targets behavioral self-expression
      method: 'unconditional-positive-regard',
      description: `Provide accepting environment for expression of: "${belief.content}"`,
      expectedOutcome: 'Allow natural self-actualization to emerge',
      success: false, // Can be co-opted
      sideEffects: [
        'Creation of new performance ideal: "being authentic"',
        'Dependency on external validation (therapist)',
        'Subtle incorporation of approval-seeking into identity',
        'Verdict remains hidden but gains new management strategy'
      ]
    };
  }
}