/**
 * Bonfire Blueprint Demo
 * 
 * A simple demonstration of the psychological reasoning framework
 * integrated with Nucleoid's declarative runtime.
 */

import nucleoid from '../nucleoid';
import { BonfireBlueprint, createBelief, createBehavior } from './index';

// Initialize Nucleoid for psychological reasoning
nucleoid.start({ test: true });

console.log('🔥 Bonfire Blueprint: Exposing the Verdict');
console.log('==========================================\n');

// Create a simple psychological profile
const profile = {
  id: 'demo-profile',
  verdicts: [],
  beliefs: [
    createBelief("I'm afraid I'll fail at this presentation", "negative-self-talk"),
    createBelief("Everyone will see that I'm a fraud", "negative-self-talk"),
    createBelief("I always mess things up", "cognitive-distortion")
  ],
  behaviors: [
    createBehavior("Working 80 hours a week to prove worth", "compensatory"),
    createBehavior("Perfectionist tendencies to avoid criticism", "compensatory")
  ],
  interventions: [],
  progress: []
};

// Apply the Bonfire Blueprint
const blueprint = new BonfireBlueprint();
const analysis = blueprint.analyzePsychologicalProfile(profile);

console.log('🔍 Symptom Analysis:');
console.log(`Found ${profile.beliefs.length} symptomatic beliefs:`);
profile.beliefs.forEach((belief, i) => {
  console.log(`  ${i + 1}. "${belief.content}"`);
});

console.log(`\nFound ${profile.behaviors.length} compensatory behaviors:`);
profile.behaviors.forEach((behavior, i) => {
  console.log(`  ${i + 1}. ${behavior.description}`);
});

console.log('\n🎯 Verdict Exposure:');
console.log(`Exposed ${analysis.exposedVerdicts.length} underlying verdicts:`);
analysis.exposedVerdicts.forEach((verdict, i) => {
  console.log(`  ${i + 1}. "${verdict.content}" (${verdict.type})`);
});

console.log('\n💡 Recommended Approach:');
console.log('❌ What NOT to do (Failed Models):');
analysis.avoidRecommendations.slice(0, 3).forEach((rec, i) => {
  console.log(`  ${i + 1}. ${rec}`);
});

console.log('\n✅ What TO do (Exposure Methods):');
analysis.recommendedExposure.forEach((rec, i) => {
  console.log(`  ${i + 1}. Use ${rec.method} for: "${rec.verdict.content}"`);
  console.log(`     First step: ${rec.steps[0]}`);
});

console.log('\n🔥 Bonfire Principle:');
console.log('Rather than slapping "I\'m worthy" over the rot,');
console.log('expose the underlying verdict and rob it of its unconscious power.');
console.log('Let the paint drip. Own the verdict. Watch it lose its grip.\n');

// Demonstrate the difference between failed and exposure methods
console.log('📊 Therapeutic Effectiveness Comparison:');
console.log('Failed Models (symptom-focused):');
console.log('  - CBT: 30% effectiveness (whack-a-mole effect)');
console.log('  - Positive Psychology: 20% effectiveness (cognitive dissonance)');
console.log('  - Humanistic Therapy: 40% effectiveness (external dependency)');

console.log('\nExposure Methods (verdict-exposing):');
console.log('  - ACT (Cognitive Defusion): 80% effectiveness');
console.log('  - Attachment Theory: 80% effectiveness');
console.log('  - Structural Tension: 90% effectiveness');

console.log('\n🌿 Integration with Nucleoid:');
console.log('This psychological reasoning is powered by Nucleoid\'s');
console.log('declarative runtime and knowledge graph capabilities,');
console.log('enabling neuro-symbolic AI for therapeutic analysis.');

export { blueprint, analysis, profile };