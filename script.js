function searchWord() {
  const word = document.getElementById("wordInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!word) {
    resultDiv.innerHTML = "<p>Please enter a word.</p>";
    return;
  }

  resultDiv.innerHTML = "Loading...";

  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
    .then(response => {
      if (!response.ok) throw new Error("Word not found");
      return response.json();
    })
    .then(data => {
      const definition = data[0].meanings
        .map(
          meaning => `
            <div class="meaning">
              <h3>${meaning.partOfSpeech}</h3>
              <p>${meaning.definitions[0].definition}</p>
            </div>
          `
        )
        .join("");

      resultDiv.innerHTML = `
        <h2>${data[0].word}</h2>
        ${definition}
      `;
    })
    .catch(() => {
      resultDiv.innerHTML = "<p>❌ Word not found. Please try another.</p>";
    });
}
