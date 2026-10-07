// Kontaktný e-mail pre podporu a ochranu súkromia – vyplň JEDNO miesto a prejaví sa na všetkých stránkach.
const CONTACT_EMAIL = "jansikuta@me.com";
document.querySelectorAll(".mail").forEach(el => {
  if (CONTACT_EMAIL) { el.innerHTML = `<a href="mailto:${CONTACT_EMAIL}?subject=Next Player Ready">${CONTACT_EMAIL}</a>`; }
  else { el.textContent = "—"; }
});
