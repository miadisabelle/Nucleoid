/**
 * Exposure Methods - as described in Part 2 of the Bonfire Blueprint
 * 
 * These approaches don't seek to replace the verdict but to expose it,
 * own it, and rob it of its power to dictate the script.
 */

import { TherapeuticModel, TherapeuticIntervention, Belief, Verdict, Behavior } from '../types';

export class AcceptanceCommitmentTherapy implements TherapeuticModel {
  id = 'act';
  name = 'Acceptance and Commitment Therapy';
  category: 'exposure-method' = 'exposure-method';
  description = 'Psychological suffering caused by experiential avoidance - the attempt to suppress unwanted private thoughts, feelings, and sensations';
  approach: 'verdict-exposing' = 'verdict-exposing';
  effectiveness = 0.8;
  limitations = [
    'Requires sustained practice',
    'Can be misunderstood as passive acceptance',
    'May initially increase distress as avoidance patterns are disrupted'
  ];
  biases = [
    'Directly addresses experiential avoidance',
    'Challenges the struggle with internal experiences'
  ];

  applyIntervention(target: Belief | Verdict | Behavior): TherapeuticIntervention {
    const belief = target as Belief;
    return {
      id: `act-${Date.now()}`,
      modelId: this.id,
      target: 'verdict',
      method: 'cognitive-defusion',
      description: `Practice defusion with: "${belief.content}" -> "I am having the thought that ${belief.content}"`,
      expectedOutcome: 'Change relationship to thought, not the thought itself',
      success: true,
      sideEffects: [
        'Initial increase in awareness of painful thoughts',
        'Temporary anxiety as avoidance patterns are disrupted',
        'Gradual reduction in thought\'s commanding power'
      ]
    };
  }

  /**
   * Core ACT technique: Cognitive Defusion
   * Sees thoughts as just thoughts, not literal truths
   */
  cognitiveDefusion(belief: Belief): string[] {
    const defusionSteps = [
      `Notice the thought: "${belief.content}"`,
      `Reframe as: "I am having the thought that ${belief.content}"`,
      `Further distance: "I notice I\'m having the thought that ${belief.content}"`,
      `Observe without attachment: "This is just a mental event, not reality"`,
      `Ask: "Is this thought helpful for my values and goals?"`,
      `Let the thought be present without fighting or feeding it`
    ];
    
    return defusionSteps;
  }

  /**
   * Exposes the verdict by removing the struggle
   * The verdict loses command over behavior when not fought
   */
  exposeVerdict(verdict: Verdict): string[] {
    return [
      `Acknowledge the verdict without resistance: "${verdict.content}"`,
      'Observe how fighting this belief gives it more power',
      'Notice the exhaustion from constantly battling this thought',
      'Practice willingness to have this belief present',
      'Commit to valued action regardless of the belief\'s presence',
      'Watch as the belief\'s grip naturally loosens without struggle'
    ];
  }
}

export class AttachmentTheory implements TherapeuticModel {
  id = 'attachment-theory';
  name = 'Attachment Theory Therapy';
  category: 'exposure-method' = 'exposure-method';
  description = 'Earliest attachment relationships form internal working models - unconscious blueprints for what we expect from others';
  approach: 'verdict-exposing' = 'verdict-exposing';
  effectiveness = 0.8;
  limitations = [
    'Requires skilled therapist to model secure attachment',
    'Long-term process',
    'May trigger attachment trauma initially'
  ];
  biases = [
    'Addresses core relational patterns',
    'Exposes internalized attachment models'
  ];

  applyIntervention(target: Verdict | Belief | Behavior): TherapeuticIntervention {
    const verdict = target as Verdict;
    return {
      id: `attachment-${Date.now()}`,
      modelId: this.id,
      target: 'verdict',
      method: 'attachment-exploration',
      description: `Explore attachment origins of verdict: "${verdict.content}"`,
      expectedOutcome: 'Expose verdict as learned model, not immutable truth',
      success: true,
      sideEffects: [
        'Temporary activation of attachment trauma',
        'Grief for unmet early needs',
        'Possible resistance to trusting therapeutic relationship'
      ]
    };
  }

  /**
   * Uses therapeutic relationship to expose ingrained relational patterns
   */
  exposeAttachmentVerdict(verdict: Verdict): string[] {
    return [
      `Identify early attachment experiences that created: "${verdict.content}"`,
      'Notice how this verdict shows up in current relationships',
      'Observe defensive patterns that protect against this verdict being confirmed',
      'Experience secure attachment in therapeutic relationship',
      'Feel the contradiction between old blueprint and new experience',
      'Recognize verdict as adaptation to early environment, not current truth',
      'Gradually internalize new relational possibilities'
    ];
  }

  /**
   * Maps attachment styles to common verdicts
   */
  identifyAttachmentVerdict(attachmentStyle: 'secure' | 'anxious' | 'avoidant' | 'disorganized'): string[] {
    const verdictMappings = {
      secure: [],
      anxious: [
        'I am only worthy when others need me',
        'I will be abandoned if I show my true self',
        'Love is conditional on my performance'
      ],
      avoidant: [
        'I cannot depend on others',
        'Vulnerability leads to rejection',
        'I must be self-sufficient to be safe'
      ],
      disorganized: [
        'People who love me will hurt me',
        'I am fundamentally broken',
        'The world is unpredictable and dangerous'
      ]
    };

    return verdictMappings[attachmentStyle];
  }
}

export class StructuralTensionApproach implements TherapeuticModel {
  id = 'structural-tension';
  name = 'Fritz\'s Structural Tension';
  category: 'exposure-method' = 'exposure-method';
  description = 'Conflict between ideal and hidden belief. Compensating behavior reinforces the hidden belief\'s power';
  approach: 'verdict-exposing' = 'verdict-exposing';
  effectiveness = 0.9;
  limitations = [
    'Requires willingness to face painful self-concepts',
    'May initially increase shame and self-judgment',
    'Demands radical honesty'
  ];
  biases = [
    'Directly addresses the motivational structure',
    'Exposes hidden belief systems'
  ];

  applyIntervention(target: Behavior | Belief | Verdict): TherapeuticIntervention {
    const behavior = target as Behavior;
    return {
      id: `structural-tension-${Date.now()}`,
      modelId: this.id,
      target: 'verdict',
      method: 'structural-analysis',
      description: `Interrogate purpose of behavior: "${behavior.description}" to expose hidden verdict`,
      expectedOutcome: 'Collapse structural conflict by exposing hidden belief',
      success: true,
      sideEffects: [
        'Initial increase in shame as hidden beliefs are exposed',
        'Resistance to acknowledging true motivations',
        'Liberation as energy from maintaining conflict is freed'
      ]
    };
  }

  /**
   * Relentlessly interrogates purpose to reveal underlying motivational structure
   */
  exposeHiddenVerdict(behavior: Behavior): string[] {
    const steps = [
      `Why do you engage in: "${behavior.description}"?`,
      'What are you trying to achieve or avoid?',
      'If you stopped this behavior, what would you be afraid might happen?',
      'What does this behavior say about what you believe about yourself?',
      'What verdict are you trying to compensate for or hide?',
      'What would it mean to stop performing this compensatory behavior?',
      'What is your real, honest opinion about yourself that drives this?'
    ];

    return steps;
  }

  /**
   * The downward arrow technique to expose core verdicts
   */
  downwardArrow(initialThought: string): string[] {
    return [
      `Initial thought: "${initialThought}"`,
      'If that were true, what would it mean?',
      'And if that were true, what would it mean?',
      'And what would that mean about you?',
      'Keep going until you reach the core verdict',
      'Own the verdict: "My real opinion is that I am ___"',
      'Notice how owning it reduces its hidden power'
    ];
  }

  /**
   * Identifies the structural tension between ideal and belief
   */
  mapStructuralTension(behavior: Behavior): {
    ideal: string;
    hiddenBelief: string;
    tension: string;
    resolution: string;
  } {
    // This would be customized based on the specific behavior
    return {
      ideal: 'I want to be seen as good/capable/worthy',
      hiddenBelief: 'I believe I am bad/incapable/unworthy',
      tension: `Engaging in ${behavior.description} to bridge the gap`,
      resolution: 'Expose and own the hidden belief to collapse the conflict'
    };
  }
}