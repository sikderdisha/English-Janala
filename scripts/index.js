//synonyms showing
const createElement = (arr) => {
  const arrElements = arr.map(
    (el) =>
      `<button class="btn btn-outline btn-info bg-[#EDF7FF] text-black">${el}</button>`,
  );
  return arrElements.join(" ");
};

//make sound
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// data fetch
function loadData() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => display(data.data)); // ⚠️ important (data.data)
}

//active remove
const removeActive = () => {
  const lessonBtn = document.querySelectorAll(".lesson-btn");
  //remove all active
  lessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

//loading
const loading = (status) => {
  if (status == true) {
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("wordContainer").classList.add("hidden");
  } else {
    document.getElementById("wordContainer").classList.remove("hidden");
    document.getElementById("loading").classList.add("hidden");
  }
};

//load word
//it received the id of the levels
const loadWord = async (id) => {
  loading(true);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  const res = await fetch(url);
  const data = await res.json();

  const clickBtn = document.getElementById(`btn-lesson-${id}`);
  removeActive();
  clickBtn.classList.add("active");
  clickBtn.classList.add("lesson-btn");

  displayWord(data.data);

  setTimeout(() => {
    loading(false);
  }, 700); // 0.7 sec delay
};

//load word details
const loadWordDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordDetails(data.data));
};

//display word
const displayWord = (words) => {
  //get id
  const wordContainer = document.getElementById("wordContainer");

  wordContainer.innerHTML = "";

  //if the card has no data
  if (words.length == 0) {
    wordContainer.innerHTML = `
        <div class="col-span-full space-y-4 items-center text-center justify-center flex flex-col">
        <img src="./assets/alert-error.png" alt="alert icon">
        <p class="hind-siliguri-light text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="hind-siliguri-light text-4xl font-bold">নেক্সট Lesson এ যান</h2>
    </div>`;
  }
  //loop
  for (const word of words) {
    //create element
    const newCard = document.createElement("div");

    newCard.innerHTML = `
<div class="bg-white rounded space-y-3 px-5 py-15 text-center">
    <h2 class="text-xl font-bold">${word.word ? word.word : "word পাওয়া যায়নি"}</h2>
    <p class="hind-siliguri-ligh font-semibold ">Meaning/Pronunciation</p>
    <div>
        <p class="break-words font-medium">
   ${word.meaning ? word.meaning : "Meaning পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}
</p>
        <div class="flex justify-between items-center pt-5">
           <button onclick="loadWordDetails(${word.id})" class="btn bg-[#e8f3fe] hover:bg-[#00BCFF]">
    <i class="fa-solid fa-circle-info"></i>
</button>

<button onclick="pronounceWord('${word.word}')" class="btn bg-[#e8f3fe] hover:bg-[#00BCFF]">
    <i class="fa-solid fa-volume-high"></i>
</button>
        </div>
    </div>

   </div>`;
    wordContainer.appendChild(newCard);
  }
  //  loading(false);
};
// display
const display = (lessons) => {
  const lessonContainer = document.getElementById("buttons");
  lessonContainer.innerHTML = "";

  for (let lesson of lessons) {
    console.log(lesson);

    const newContainer = document.createElement("div");

    // content add
    newContainer.innerHTML = `
           <button id="btn-lesson-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-info"><i class="fa-brands fa-leanpub"></i> Lesson-${lesson.level_no}</button>
        `;

    // append
    lessonContainer.appendChild(newContainer);
  }
};

//display word details
const displayWordDetails = (word) => {
  const modal = document.getElementById("modal_details");
  modal.innerHTML = `
<div class="card w-96 bg-base-100 shadow-sm">
  <div class="card-body">
    <!-- heading  -->
    <div class="space-y-3">
      <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines "></i> :${word.pronunciation})</h2>
      <p class="text-[20px] font-semibold">Meaning</p>
      <p class="text-[20px] hind-siliguri-light">${word.meaning}</p>
    </div>
<!-- example -->

  <h3 class="font-semibold text-[20px] pt-4">Example</h3>
  <p >${word.sentence}</p>


<!-- buttons  -->
  <h3 class="font-semibold text-[20px] pt-4">Synonyms</h3>

   <div class="">
${createElement(word.synonyms)}
   </div>
 </div>
  </div>
  <button class="btn btn-info my-3 text-white">Complete Learning</button>`;

  document.getElementById("my_modal").showModal();
};
loadData();

//search
document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();
  const input = document.getElementById("input");
  const search = input.value.trim().toLowerCase();

  const url = "https://openapi.programming-hero.com/api/words/all";

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allData = data.data;

      // correct filter
      const filterWord = allData.filter((word) =>
        word.word.toLowerCase().includes(search),
      );

      console.log(filterWord);

      // show filtered data
      displayWord(filterWord);
    });
});
