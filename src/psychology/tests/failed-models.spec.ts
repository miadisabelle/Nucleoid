/**
 * Tests for Failed Therapeutic Models
 */

import { 
  CognitiveBehavioralTherapy, 
  PositivePsychology, 
  HumanisticTherapy 
} from '../models/failed-models';
import { Belief } from '../types';

describe('Failed Therapeutic Models', () => {
  describe('Cognitive Behavioral Therapy', () => {
    let cbt: CognitiveBehavioralTherapy;

    beforeEach(() => {
      cbt = new CognitiveBehavioralTherapy();
    });

    test('should be categorized as failed model', () => {
      expect(cbt.category).toBe('failed-model');
      expect(cbt.approach).toBe('symptom-focused');
      expect(cbt.effectiveness).toBeLessThan(0.5);
    });

    test('should identify known limitations', () => {
      expect(cbt.limitations).toContain('Creates whack-a-mole effect - defeats specific thoughts but underlying verdict generates new ones');
      expect(cbt.biases).toContain('Fundamental Attribution Error (internalized)');
    });

    test('should apply intervention that targets beliefs, not verdicts', () => {
      const belief: Belief = {
        id: 'test-belief',
        content: 'I always fail at everything',
        type: 'cognitive-distortion',
        frequency: 0.8
      };

      const intervention = cbt.applyIntervention(belief);

      expect(intervention.target).toBe('belief');
      expect(intervention.method).toBe('cognitive-restructuring');
      expect(intervention.success).toBe(false);
      expect(intervention.sideEffects).toContain('Whack-a-mole effect - new distorted thoughts emerge');
    });

    test('should identify cognitive distortions', () => {
      const allOrNothingBelief: Belief = {
        id: 'test1',
        content: 'I always mess up everything',
        type: 'cognitive-distortion', 
        frequency: 0.7
      };

      const distortions = cbt.identifyDistortions(allOrNothingBelief);
      expect(distortions).toContain('all-or-nothing thinking');
    });
  });

  describe('Positive Psychology', () => {
    let positivePsych: PositivePsychology;

    beforeEach(() => {
      positivePsych = new PositivePsychology();
    });

    test('should be categorized as failed model with low effectiveness', () => {
      expect(positivePsych.category).toBe('failed-model');
      expect(positivePsych.effectiveness).toBeLessThan(0.3);
    });

    test('should identify self-verification bias', () => {
      expect(positivePsych.biases).toContain('Self-Verification Theory');
    });

    test('should apply intervention that creates cognitive dissonance', () => {
      const belief: Belief = {
        id: 'test-belief',
        content: 'I am worthless',
        type: 'negative-self-talk',
        frequency: 0.9
      };

      const intervention = positivePsych.applyIntervention(belief);

      expect(intervention.target).toBe('belief');
      expect(intervention.method).toBe('self-affirmation');
      expect(intervention.success).toBe(false);
      expect(intervention.sideEffects).toContain('Cognitive dissonance between affirmation and core belief');
    });

    test('should generate opposing affirmations', () => {
      const failureBelief: Belief = {
        id: 'test1',
        content: 'I am a failure',
        type: 'negative-self-talk',
        frequency: 0.8
      };

      const intervention = positivePsych.applyIntervention(failureBelief);
      expect(intervention.description).toContain('I am successful and capable');
    });
  });

  describe('Humanistic Therapy', () => {
    let humanistic: HumanisticTherapy;

    beforeEach(() => {
      humanistic = new HumanisticTherapy();
    });

    test('should have higher effectiveness than other failed models but still limited', () => {
      expect(humanistic.effectiveness).toBeGreaterThan(0.3);
      expect(humanistic.effectiveness).toBeLessThan(0.5);
      expect(humanistic.category).toBe('failed-model');
    });

    test('should identify spotlight effect bias', () => {
      expect(humanistic.biases).toContain('Spotlight Effect');
    });

    test('should apply intervention that can be co-opted', () => {
      const belief: Belief = {
        id: 'test-belief',
        content: 'I need to hide my true self',
        type: 'negative-self-talk',
        frequency: 0.7
      };

      const intervention = humanistic.applyIntervention(belief);

      expect(intervention.target).toBe('behavior');
      expect(intervention.method).toBe('unconditional-positive-regard');
      expect(intervention.success).toBe(false);
      expect(intervention.sideEffects).toContain('Creation of new performance ideal: "being authentic"');
    });

    test('should recognize limitations around external validation', () => {
      expect(humanistic.limitations).toContain('Healing becomes contingent on external source (therapist approval)');
    });
  });

  describe('Comparative Analysis', () => {
    test('all failed models should target symptoms, not verdicts', () => {
      const cbt = new CognitiveBehavioralTherapy();
      const positivePsych = new PositivePsychology();
      const humanistic = new HumanisticTherapy();

      const belief: Belief = {
        id: 'test',
        content: 'I am flawed',
        type: 'negative-self-talk',
        frequency: 0.8
      };

      const cbtIntervention = cbt.applyIntervention(belief);
      const ppIntervention = positivePsych.applyIntervention(belief);
      const humanisticIntervention = humanistic.applyIntervention(belief);

      expect(cbtIntervention.target).not.toBe('verdict');
      expect(ppIntervention.target).not.toBe('verdict');
      expect(humanisticIntervention.target).not.toBe('verdict');
    });

    test('all failed models should have success: false', () => {
      const models = [
        new CognitiveBehavioralTherapy(),
        new PositivePsychology(),
        new HumanisticTherapy()
      ];

      const belief: Belief = {
        id: 'test',
        content: 'I am broken',
        type: 'negative-self-talk',
        frequency: 0.9
      };

      models.forEach(model => {
        const intervention = model.applyIntervention(belief);
        expect(intervention.success).toBe(false);
        expect(intervention.sideEffects).toBeDefined();
        expect(intervention.sideEffects!.length).toBeGreaterThan(0);
      });
    });

    test('failed models should have effectiveness < 0.5', () => {
      const models = [
        new CognitiveBehavioralTherapy(),
        new PositivePsychology(),
        new HumanisticTherapy()
      ];

      models.forEach(model => {
        expect(model.effectiveness).toBeLessThan(0.5);
        expect(model.approach).toBe('symptom-focused');
        expect(model.category).toBe('failed-model');
      });
    });
  });
});