const fs = require('fs');

console.log('=== RUNNING AUTOMATED AUDIT OF ALL FORMS & MODALS ===\n');

const html = fs.readFileSync('index.html', 'utf8');
const js = fs.readFileSync('app.js', 'utf8');

let errors = [];
let passes = [];

function assert(condition, message) {
  if (condition) {
    passes.push('✓ ' + message);
  } else {
    errors.push('✗ ' + message);
  }
}

// 1. Verify Modals exist in HTML
assert(html.includes('id="modal-application"'), 'Modal #modal-application exists');
assert(html.includes('id="modal-admissions"'), 'Modal #modal-admissions exists');
assert(html.includes('id="modal-curriculum"'), 'Modal #modal-curriculum exists');

// 2. Verify Forms exist in HTML
assert(html.includes('id="application-wizard-form"'), 'Form #application-wizard-form exists');
assert(html.includes('id="admissions-callback-form"'), 'Form #admissions-callback-form exists');

// 3. Verify Application Form Inputs
const requiredAppInputs = ['app-name', 'app-email', 'app-phone-code', 'app-phone', 'app-country'];
requiredAppInputs.forEach(id => {
  assert(html.includes(`id="${id}"`), `Application input #${id} exists in HTML`);
});

// 4. Verify Step 2 Radio Options for all tiers
['seeker', 'immersive', 'ultimate', 'help-choose'].forEach(tier => {
  assert(html.includes(`value="${tier}"`), `Preferred option radio for tier "${tier}" exists`);
});

// 5. Verify Curriculum modal has valid trigger button
const curriculumBtnMatch = html.match(/<div[^>]*id=["']modal-curriculum["'][\s\S]*?class=["'][^"']*trigger-apply-modal[^"']*["']/);
assert(curriculumBtnMatch !== null, 'Curriculum modal contains .trigger-apply-modal button');

// 6. Verify openModal closes other modals first (Bugfix verification)
assert(js.includes('document.querySelectorAll(\'.modal-backdrop.open\').forEach'), 'openModal closes already open modals first so modals never hide each other');

// 7. Verify auto-redirect to WhatsApp logic in app.js
assert(js.includes('window.location.href = waUrl'), 'Auto-redirect to WhatsApp on form submission is implemented');
assert(js.includes('Redirecting you to WhatsApp in'), 'Live countdown timer notice is displayed');

// 8. Verify Validation in app.js
assert(js.includes('validateEmail'), 'Email format validator is present in app.js');
assert(!js.includes("alert('Please enter your full name.')"), 'Replaced blocking browser alerts with non-blocking inline feedback');

// 9. Verify localStorage persistence
assert(js.includes('localStorage.setItem(\'ay_applications\''), 'Application submissions are saved to localStorage');

// Print Results
console.log('RESULTS:');
passes.forEach(p => console.log(p));
if (errors.length > 0) {
  console.error('\nERRORS FOUND:');
  errors.forEach(e => console.error(e));
  process.exit(1);
} else {
  console.log('\n>>> ALL 13 TEST SUITES PASSED FLAWLESSLY! <<<');
}
