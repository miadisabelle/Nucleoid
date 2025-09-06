/**
 * Tests for Exposure Methods - Therapeutic approaches that expose verdicts
 */

import { 
  AcceptanceCommitmentTherapy, 
  AttachmentTheory, 
  StructuralTensionApproach 
} from '../models/exposure-methods';
import { Belief, Verdict, Behavior } from '../types';

describe('Exposure Methods', () => {
  describe('Acceptance and Commitment Therapy', () => {
    let act: AcceptanceCommitmentTherapy;

    beforeEach(() => {
      act = new AcceptanceCommitmentTherapy();
    });

    test('should be categorized as exposure method', () => {
      expect(act.category).toBe('exposure-method');
      expect(act.approach).toBe('verdict-exposing');
      expect(act.effectiveness).toBeGreaterThan(0.7);
    });

    test('should apply cognitive defusion intervention', () => {
      const belief: Belief = {
        id: 'test-belief',
        content: 'I am a failure',
        type: 'negative-self-talk',
        frequency: 0.8
      };

      const intervention = act.applyIntervention(belief);

      expect(intervention.target).toBe('verdict');
      expect(intervention.method).toBe('cognitive-defusion');
      expect(intervention.success).toBe(true);
      expect(intervention.description).toContain('I am having the thought that');
    });

    test('should provide cognitive defusion steps', () => {
      const belief: Belief = {
        id: 'test',
        content: 'I am worthless',
        type: 'negative-self-talk',
        frequency: 0.9
      };

      const steps = act.cognitiveDefusion(belief);

      expect(steps.length).toBeGreaterThan(3);
      expect(steps[0]).toContain('Notice the thought');
      expect(steps[1]).toContain('I am having the thought that');
      expect(steps[steps.length - 1]).toContain('without fighting or feeding it');
    });

    test('should expose verdict without fighting it', () => {
      const verdict: Verdict = {
        id: 'test-verdict',
        content: 'I am fundamentally flawed',
        type: 'self-worth',
        strength: 0.9,
        unconscious: false,
        createdAt: new Date()
      };

      const exposureSteps = act.exposeVerdict(verdict);

      expect(exposureSteps.length).toBeGreaterThan(4);
      expect(exposureSteps[0]).toContain('Acknowledge the verdict without resistance');
      expect(exposureSteps).toContain('Practice willingness to have this belief present');
    });
  });

  describe('Attachment Theory', () => {
    let attachmentTheory: AttachmentTheory;

    beforeEach(() => {
      attachmentTheory = new AttachmentTheory();
    });

    test('should be high-effectiveness exposure method', () => {
      expect(attachmentTheory.category).toBe('exposure-method');
      expect(attachmentTheory.effectiveness).toBeGreaterThan(0.7);
    });

    test('should apply attachment exploration intervention', () => {
      const verdict: Verdict = {
        id: 'test-verdict',
        content: 'I am unlovable',
        type: 'belonging',
        strength: 0.8,
        unconscious: true,
        createdAt: new Date()
      };

      const intervention = attachmentTheory.applyIntervention(verdict);

      expect(intervention.target).toBe('verdict');
      expect(intervention.method).toBe('attachment-exploration');
      expect(intervention.success).toBe(true);
      expect(intervention.description).toContain('attachment origins');
    });

    test('should expose attachment verdict origins', () => {
      const verdict: Verdict = {
        id: 'test-verdict',
        content: 'I cannot trust anyone',
        type: 'safety',
        strength: 0.9,
        unconscious: false,
        createdAt: new Date()
      };

      const exposureSteps = attachmentTheory.exposeAttachmentVerdict(verdict);

      expect(exposureSteps.length).toBeGreaterThan(5);
      expect(exposureSteps[0]).toContain('early attachment experiences');
      expect(exposureSteps[exposureSteps.length - 1]).toContain('internalize new relational possibilities');
    });

    test('should map attachment styles to verdicts', () => {
      const anxiousVerdicts = attachmentTheory.identifyAttachmentVerdict('anxious');
      const avoidantVerdicts = attachmentTheory.identifyAttachmentVerdict('avoidant');
      const disorganizedVerdicts = attachmentTheory.identifyAttachmentVerdict('disorganized');

      expect(anxiousVerdicts).toContain('I will be abandoned if I show my true self');
      expect(avoidantVerdicts).toContain('I cannot depend on others');
      expect(disorganizedVerdicts).toContain('People who love me will hurt me');
    });

    test('should return empty array for secure attachment', () => {
      const secureVerdicts = attachmentTheory.identifyAttachmentVerdict('secure');
      expect(secureVerdicts).toEqual([]);
    });
  });

  describe('Structural Tension Approach', () => {
    let structuralTension: StructuralTensionApproach;

    beforeEach(() => {
      structuralTension = new StructuralTensionApproach();
    });

    test('should be highest effectiveness exposure method', () => {
      expect(structuralTension.category).toBe('exposure-method');
      expect(structuralTension.effectiveness).toBe(0.9);
    });

    test('should apply structural analysis intervention', () => {
      const behavior: Behavior = {
        id: 'test-behavior',
        description: 'Working 80 hours a week to prove worth',
        type: 'compensatory',
        triggers: ['evaluation', 'criticism'],
        effectiveness: 0.3,
        cost: 0.9
      };

      const intervention = structuralTension.applyIntervention(behavior);

      expect(intervention.target).toBe('verdict');
      expect(intervention.method).toBe('structural-analysis');
      expect(intervention.success).toBe(true);
      expect(intervention.description).toContain('Interrogate purpose');
    });

    test('should expose hidden verdict through questioning', () => {
      const behavior: Behavior = {
        id: 'test-behavior',
        description: 'Perfectionist tendencies',
        type: 'compensatory',
        triggers: ['mistakes'],
        effectiveness: 0.2,
        cost: 0.8
      };

      const exposureSteps = structuralTension.exposeHiddenVerdict(behavior);

      expect(exposureSteps.length).toBeGreaterThan(5);
      expect(exposureSteps[0]).toContain('Why do you engage in');
      expect(exposureSteps[exposureSteps.length - 1]).toContain('real, honest opinion about yourself');
    });

    test('should apply downward arrow technique', () => {
      const initialThought = 'I might fail this presentation';
      const steps = structuralTension.downwardArrow(initialThought);

      expect(steps.length).toBeGreaterThan(5);
      expect(steps[0]).toContain('Initial thought');
      expect(steps[1]).toContain('If that were true, what would it mean?');
      expect(steps[steps.length - 2]).toContain('My real opinion is that I am');
    });

    test('should map structural tension components', () => {
      const behavior: Behavior = {
        id: 'test-behavior',
        description: 'People-pleasing to avoid rejection',
        type: 'compensatory',
        triggers: ['conflict', 'disapproval'],
        effectiveness: 0.4,
        cost: 0.7
      };

      const tension = structuralTension.mapStructuralTension(behavior);

      expect(tension.ideal).toContain('good');
      expect(tension.hiddenBelief).toContain('bad');
      expect(tension.tension).toContain(behavior.description);
      expect(tension.resolution).toContain('Expose and own the hidden belief');
    });
  });

  describe('Comparative Analysis of Exposure Methods', () => {
    test('all exposure methods should target verdicts', () => {
      const act = new AcceptanceCommitmentTherapy();
      const attachment = new AttachmentTheory();
      const structural = new StructuralTensionApproach();

      const belief: Belief = {
        id: 'test',
        content: 'I am broken',
        type: 'negative-self-talk',
        frequency: 0.8
      };

      const verdict: Verdict = {
        id: 'test-verdict',
        content: 'I am fundamentally flawed',
        type: 'self-worth',
        strength: 0.8,
        unconscious: true,
        createdAt: new Date()
      };

      const behavior: Behavior = {
        id: 'test-behavior',
        description: 'Overachieving to prove worth',
        type: 'compensatory',
        triggers: ['evaluation'],
        effectiveness: 0.3,
        cost: 0.8
      };

      const actIntervention = act.applyIntervention(belief);
      const attachmentIntervention = attachment.applyIntervention(verdict);
      const structuralIntervention = structural.applyIntervention(behavior);

      expect(actIntervention.target).toBe('verdict');
      expect(attachmentIntervention.target).toBe('verdict');
      expect(structuralIntervention.target).toBe('verdict');
    });

    test('all exposure methods should have success: true', () => {
      const methods = [
        new AcceptanceCommitmentTherapy(),
        new AttachmentTheory(),
        new StructuralTensionApproach()
      ];

      const belief: Belief = {
        id: 'test',
        content: 'I am defective',
        type: 'negative-self-talk',
        frequency: 0.9
      };

      const verdict: Verdict = {
        id: 'test-verdict',
        content: 'I am fundamentally inadequate',
        type: 'capability',
        strength: 0.8,
        unconscious: true,
        createdAt: new Date()
      };

      const behavior: Behavior = {
        id: 'test-behavior',
        description: 'Avoiding challenges',
        type: 'avoidant',
        triggers: ['difficulty'],
        effectiveness: 0.5,
        cost: 0.7
      };

      // Test ACT with belief
      const actIntervention = methods[0].applyIntervention(belief);
      expect(actIntervention.success).toBe(true);

      // Test Attachment with verdict
      const attachmentIntervention = methods[1].applyIntervention(verdict);
      expect(attachmentIntervention.success).toBe(true);

      // Test Structural with behavior
      const structuralIntervention = methods[2].applyIntervention(behavior);
      expect(structuralIntervention.success).toBe(true);
    });

    test('exposure methods should have high effectiveness', () => {
      const methods = [
        new AcceptanceCommitmentTherapy(),
        new AttachmentTheory(),
        new StructuralTensionApproach()
      ];

      methods.forEach(method => {
        expect(method.effectiveness).toBeGreaterThan(0.7);
        expect(method.approach).toBe('verdict-exposing');
        expect(method.category).toBe('exposure-method');
      });
    });
  });
});