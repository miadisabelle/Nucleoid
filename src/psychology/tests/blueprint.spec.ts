/**
 * Tests for the Bonfire Blueprint psychological reasoning framework
 */

import { BonfireBlueprint } from '../blueprint';
import { 
  Verdict, 
  Belief, 
  Behavior, 
  PsychologicalProfile 
} from '../types';

describe('Bonfire Blueprint', () => {
  let blueprint: BonfireBlueprint;

  beforeEach(() => {
    blueprint = new BonfireBlueprint();
  });

  describe('Verdict Exposure', () => {
    test('should expose verdict from negative self-talk using downward arrow', () => {
      const belief: Belief = {
        id: 'test-belief-1',
        content: 'I\'m afraid I\'ll fail at this presentation',
        type: 'negative-self-talk',
        frequency: 0.8
      };

      const exposedVerdict = blueprint.exposeVerdict(belief);

      expect(exposedVerdict).not.toBeNull();
      expect(exposedVerdict?.content).toContain('inadequate');
      expect(exposedVerdict?.type).toBe('capability');
      expect(exposedVerdict?.unconscious).toBe(false); // Now conscious after exposure
    });

    test('should expose self-worth verdict from shame-based thoughts', () => {
      const belief: Belief = {
        id: 'test-belief-2',
        content: 'Everyone will see that I\'m a fraud',
        type: 'negative-self-talk',
        frequency: 0.9
      };

      const exposedVerdict = blueprint.exposeVerdict(belief);

      expect(exposedVerdict).not.toBeNull();
      expect(exposedVerdict?.type).toBe('capability');
      expect(exposedVerdict?.strength).toBeGreaterThan(0.5);
    });

    test('should return null for positive rational thoughts', () => {
      const belief: Belief = {
        id: 'test-belief-3',
        content: 'I can learn from this experience',
        type: 'rational-thought',
        frequency: 0.3
      };

      const exposedVerdict = blueprint.exposeVerdict(belief);

      expect(exposedVerdict).toBeNull();
    });
  });

  describe('Psychological Profile Analysis', () => {
    test('should perform complete Bonfire analysis on profile', () => {
      const profile: PsychologicalProfile = {
        id: 'test-profile-1',
        verdicts: [],
        beliefs: [
          {
            id: 'belief-1',
            content: 'I always mess things up',
            type: 'cognitive-distortion',
            frequency: 0.8
          },
          {
            id: 'belief-2', 
            content: 'People will leave me if they see the real me',
            type: 'negative-self-talk',
            frequency: 0.7
          }
        ],
        behaviors: [
          {
            id: 'behavior-1',
            description: 'Working excessively to prove worth',
            type: 'compensatory',
            triggers: ['criticism', 'evaluation'],
            effectiveness: 0.4,
            cost: 0.8
          },
          {
            id: 'behavior-2',
            description: 'Avoiding close relationships',
            type: 'avoidant',
            triggers: ['intimacy', 'vulnerability'],
            effectiveness: 0.3,
            cost: 0.9
          }
        ],
        interventions: [],
        progress: []
      };

      const analysis = blueprint.analyzePsychologicalProfile(profile);

      expect(analysis.profileId).toBe('test-profile-1');
      expect(analysis.exposedVerdicts.length).toBeGreaterThan(0);
      expect(analysis.connectedSymptoms.length).toBeGreaterThan(0);
      expect(analysis.recommendedExposure.length).toBeGreaterThan(0);
      expect(analysis.avoidRecommendations.length).toBeGreaterThan(0);
    });

    test('should map symptoms to appropriate verdicts', () => {
      const profile: PsychologicalProfile = {
        id: 'test-profile-2',
        verdicts: [],
        beliefs: [
          {
            id: 'belief-1',
            content: 'I\'m not good enough',
            type: 'negative-self-talk',
            frequency: 0.9
          }
        ],
        behaviors: [
          {
            id: 'behavior-1',
            description: 'Perfectionist tendencies to avoid criticism',
            type: 'compensatory',
            triggers: ['evaluation'],
            effectiveness: 0.2,
            cost: 0.9
          }
        ],
        interventions: [],
        progress: []
      };

      const analysis = blueprint.analyzePsychologicalProfile(profile);
      
      expect(analysis.connectedSymptoms.length).toBeGreaterThan(0);
      
      const connection = analysis.connectedSymptoms[0];
      expect(connection.beliefs.length).toBe(1);
      expect(connection.behaviors.length).toBe(1);
    });

    test('should recommend appropriate exposure methods', () => {
      const profile: PsychologicalProfile = {
        id: 'test-profile-3',
        verdicts: [],
        beliefs: [
          {
            id: 'belief-1',
            content: 'I am fundamentally unlovable',
            type: 'negative-self-talk',
            frequency: 0.8
          }
        ],
        behaviors: [],
        interventions: [],
        progress: []
      };

      const analysis = blueprint.analyzePsychologicalProfile(profile);
      
      expect(analysis.recommendedExposure.length).toBeGreaterThan(0);
      
      const recommendation = analysis.recommendedExposure[0];
      expect(recommendation.method).toBe('attachment-exploration'); // For belonging verdicts
      expect(recommendation.steps.length).toBeGreaterThan(0);
    });

    test('should provide avoidance recommendations', () => {
      const profile: PsychologicalProfile = {
        id: 'test-profile-4',
        verdicts: [],
        beliefs: [{ 
          id: 'belief-1', 
          content: 'I hate myself', 
          type: 'negative-self-talk', 
          frequency: 0.9 
        }],
        behaviors: [],
        interventions: [],
        progress: []
      };

      const analysis = blueprint.analyzePsychologicalProfile(profile);
      
      expect(analysis.avoidRecommendations).toContain(
        'Don\'t try to argue with or disprove the verdict using logic (CBT approach)'
      );
      expect(analysis.avoidRecommendations).toContain(
        'Don\'t layer positive affirmations over the verdict (Positive Psychology)'
      );
    });
  });

  describe('Therapeutic Interventions', () => {
    test('should apply Bonfire Blueprint interventions successfully', () => {
      const profile: PsychologicalProfile = {
        id: 'test-profile-5',
        verdicts: [],
        beliefs: [
          {
            id: 'belief-1',
            content: 'I am a burden to everyone',
            type: 'negative-self-talk',
            frequency: 0.8
          }
        ],
        behaviors: [],
        interventions: [],
        progress: []
      };

      const interventions = blueprint.applyBonfireBlueprint(profile);

      expect(interventions.length).toBeGreaterThan(0);
      
      const intervention = interventions[0];
      expect(intervention.modelId).toBe('bonfire-blueprint');
      expect(intervention.target).toBe('verdict');
      expect(intervention.success).toBe(true);
      expect(intervention.sideEffects).toBeDefined();
    });
  });

  describe('Edge Cases', () => {
    test('should handle empty psychological profile', () => {
      const emptyProfile: PsychologicalProfile = {
        id: 'empty-profile',
        verdicts: [],
        beliefs: [],
        behaviors: [],
        interventions: [],
        progress: []
      };

      const analysis = blueprint.analyzePsychologicalProfile(emptyProfile);

      expect(analysis.profileId).toBe('empty-profile');
      expect(analysis.exposedVerdicts).toEqual([]);
      expect(analysis.connectedSymptoms).toEqual([]);
      expect(analysis.recommendedExposure).toEqual([]);
      expect(analysis.avoidRecommendations.length).toBeGreaterThan(0); // Always provide these
    });

    test('should handle profile with only positive beliefs', () => {
      const positiveProfile: PsychologicalProfile = {
        id: 'positive-profile',
        verdicts: [],
        beliefs: [
          {
            id: 'belief-1',
            content: 'I am capable and worthy',
            type: 'rational-thought',
            frequency: 0.9
          }
        ],
        behaviors: [
          {
            id: 'behavior-1',
            description: 'Setting healthy boundaries',
            type: 'healthy-coping',
            triggers: ['stress'],
            effectiveness: 0.8,
            cost: 0.2
          }
        ],
        interventions: [],
        progress: []
      };

      const analysis = blueprint.analyzePsychologicalProfile(positiveProfile);

      expect(analysis.exposedVerdicts).toEqual([]);
      expect(analysis.recommendedExposure).toEqual([]);
    });
  });
});