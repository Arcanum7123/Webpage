import "./App.css";
//Put unit tests in

function Logo() {
  return <img src={require("./Map.png")} alt="A map" id="Logo" />;
}

function Header() {
  return <h1 id="Heading">Country wiki</h1>;
}

function Subhead() {
  return <h3 id="Subheading">Find the information you want about countries easily</h3>;
}

function CurrencyImage() {
  return <img src={require("./Currency.png")} alt="Picture of currency symbols" className="LRot LImage Art" />;
}

function PhoneImage() {
  return <img src={require("./Phone.png")} alt="Picture of a phone" className="LRot RImage Art" />;
}

function CityImage() {
  return <img src={require("./City.png")} alt="Image of a city skyline" className="RRot LImage Art" />;
}

function LangImage() {
  return <img src={require("./Language.png")} alt="Image of words in various languages" className="RRot RImage Art" />;
}

function InputInfo() {
  return <p className="Instructions">Please select the information you would like and enter the country you would like the know about, then click the search button.</p>;
}

function Output() {
  return <div id="Output"> </div>;
}

function Spacer() {
  return <div id="Gap"></div>;
}

function OutputSelect() {
  return (
    <div className="Radio">
      <label>
        <input type="radio" value="capital" name="Option" id="Capital" />
        Capital city
      </label>

      <label>
        <input type="radio" value="currencies" name="Option" id="Currencies" />
        Currency
      </label>

      <label>
        <input type="radio" value="idd" name="Option" id="IDD" />
        Calling code
      </label>
      
      <label>
        <input type="radio" value="languages" name="Option" id="Languages" />
        Language
      </label>
    </div>
  );
}

function CountryInput() {
  return (
    <div id="SearchOuter">
      <input type="text" id="Country" placeholder="Enter a country"></input>
    </div>
  );
}

function SearchButton() {
  async function GetCountryName(countryInput) { //Gets correctly capitalised country name
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryInput}?fields=name`);
    const text = await response.text();
    let countryOutput = text.split('\",\"')[0]; //Removes superfluous characters after name
    countryOutput = countryOutput.split('\":\"')[1]; //Removes superfluous characters before name
    console.log(countryOutput);
    return countryOutput;
  }

  function cleanCapital(textIn) {
    const textTwo = textIn.split('\"]')[0]; //Removes superfluous characters after capital
    const textFinal = textTwo.split('[\"')[1]; //Removes superfluous characters before capital
    return textFinal;
  }

  function cleanCurrency(textIn) {
    const textTwo = textIn.split('e\":\"')[1];
    const textFinal = textTwo.split('","')[0];
    return textFinal;
  }

  function cleanLanguageIDD(textIn) {
    const textTwo = textIn.split('\":\"')[1];
    const textThree = textTwo.split('\"}}')[0];
    const textFinal = textThree.split('\",\"')[0];
    return textFinal;
  }

  async function handleClick() { //Searches in API for the country in the textbox
    const countryInput = document.getElementById("Country").value.toLowerCase(); //Gets input
    const displayResult = document.getElementById("Output"); //Gets output location
    const outputSelected = document.getElementsByName("Option");
    let optionSelected = "capital";
    for (let i = 0; i < outputSelected.length; i++) {
      if (outputSelected[i].checked) {
        optionSelected = outputSelected[i].value;
      }
    }

    if (countryInput){
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryInput}?fields=${optionSelected}`); //Finds capital
      const text = await response.text();
      console.log(text);
      
      const countryOutput = await GetCountryName(countryInput);
      let answer;
      let problem = false;

      if (!text.includes("capital") && !text.includes("currencies") && !text.includes("languages") && !text.includes("idd")) { //If there is not a valid output for the input
        displayResult.innerHTML = `Please select what you want to know and enter a country.`;
      } else {
        if (optionSelected.includes("capital")) {
          answer = cleanCapital(text);
        } else if(optionSelected.includes("currencies")) {
          optionSelected = "currency"
          answer = "the " + cleanCurrency(text);
        } else if (optionSelected.includes("languages")) {
          optionSelected = "language";
          answer = cleanLanguageIDD(text);
        } else if (optionSelected.includes("idd")) {
          optionSelected = "calling code";
          answer = cleanLanguageIDD(text);
        } else {
          problem = true;
        }

        if (!problem) {
          displayResult.innerHTML = `The ${optionSelected} of ${countryOutput} is ${answer}.`;
        } else {
          displayResult.innerHTML = `Oops! Something went wrong. Please try again.`
        }
      }
    } else { //If clicked without search term
      displayResult.innerHTML = `Please select what you want to know and enter a country.`;
    }
  }

  return (
    <button type="button" id="SearchButton" onClick={handleClick}>
    Search
    </button>);
}

//Sakila stuff
function SakilaHeader() {
  return <h1 id="SakilaHeader">Film and actor database</h1>;
}

function SakilaOutput() {
  return <div id="SakilaOutput"></div>;
}

function SakilaOutputSelect() {
  return (
    <div className="Radio">
      <label>
        <input type="radio" value="filmsIn" name="SakilaOption" id="FilmsIn" />
        Films in category
      </label>

      <label>
        <input type="radio" value="updateRating" name="SakilaOption" id="UpdateRating" />
        Update flim rating
      </label>

      <label>
        <input type="radio" value="categoryToFilm" name="SakilaOption" id="AddCategory" />
        Add a category to a film
      </label>
      
      <label>
        <input type="radio" value="removeCat" name="SakilaOption" id="RemoveCategory" />
        Remove category from film
      </label>
    </div>
  );
}

function SakilaInputBar() {
  return (
    <div id="SakilaSearchOuter">
      <input type="text" id="SakilaInput" placeholder="Enter details"></input>
    </div>
  );
}

function SakilaInstruction() {
  return <div id="SakilaInstructions"></div>
}

function SakilaSearchButton() {
  async function sakilaHandleClick() {
    const sakilaOutput = document.getElementById("SakilaOutput");
    const sakilaInput = document.getElementById("SakilaInput").value.toUpperCase();
    const sakilaRadioSelected = document.getElementsByName("SakilaOption");
    let sakilaOption = "Unselected";
    for (let i = 0; i < sakilaRadioSelected.length; i++) {
      if (sakilaRadioSelected[i].checked) {
        sakilaOption = sakilaRadioSelected[i].value;
      }
    }

    const sakInstruct = document.getElementById("SakilaInstructions");

    if (sakilaInput) {
      switch (sakilaOption) {
        case "filmsIn":
          sakInstruct.innerHTML = `Type a film genre and press go`;
          const sakilaResponse = await fetch(`http://localhost:8080/home/filmsInCategory/${sakilaInput}`, {method: "GET"});
          const sakilaText = await sakilaResponse.json();
          console.log(sakilaText);
          sakilaOutput.innerHTML = sakilaText;
          break;
        case "updateRating":
          sakInstruct.innerHTML = `Type a film title followed by a comma and a space, then type the new rating (G, PG, PG-13, R, NC-17) and press go`
          const allowedRatings = ["G", "PG", "PG-13", "R", "NC-17"];
          const filmTitle = sakilaInput.split(', ')[0];
          const newRating = sakilaInput.split(', ')[1];
          
          //If allowed, amend
          if (!(filmTitle === undefined) && (allowedRatings.includes(newRating))){
            await fetch(`http://localhost:8080/home/updateRating/${filmTitle}/${newRating}`, {method: "PUT"});
            sakilaOutput.innerHTML = `The rating of ${filmTitle} has been updated to ${newRating}!`
          } else {
            sakilaOutput.innerHTML = `Oops, something went wrong! Make sure you input in the format "[film title], [new rating]"`
          }
          break;
        case "categoryToFilm":
          sakInstruct.innerHTML = `Type a film title followed by a comma and a space, then the genre to add to the film and press go`
          const newCategory = sakilaInput.split(', ')[1];
          const filmTitleC = sakilaInput.split(', ')[0];

          //If allowed, add
          if (!(filmTitleC === undefined) && !(newCategory === undefined)) {
            await fetch(`http://localhost:8080/home/add/${newCategory}/categoryTo/${filmTitleC}`, {method: "POST"});
            sakilaOutput.innerHTML = `${filmTitleC} is now included in the ${newCategory} genre.`
          } else {
            sakilaOutput.innerHTML = `Oops, something went wrong! Make sure you input in the format "[film title], [new genre]"`
          }
          break;
        case "removeCat":
          sakInstruct.innerHTML = `Type a film title followed by a comma and a space, then the genre to remove from the film and press go`
          const newCategoryR = sakilaInput.split(', ')[1];
          const filmTitleR = sakilaInput.split(', ')[0];

          //If allowed, delete category
          if (!(filmTitleR === undefined) && !(newCategoryR === undefined)) {
            await fetch(`http://localhost:8080/home/removeFrom/category/${newCategoryR}/film/${filmTitleR}`, {method: "DELETE"});
            sakilaOutput.innerHTML = `${filmTitleR} is no longer included as a ${newCategoryR} film.`
          } else {
            sakilaOutput.innerHTML = `Oops, something went wrong! Make sure you input in the format "[film title], [genre to remove]"`
          }
          break;
        default:
          SakilaOutput.innerHTML = `Please select an action to take.`
      } 
    }
  }

  return (
    <button type="button" id="SakilaSearchButton" onClick={sakilaHandleClick}>
    Go
    </button>);
}

export default function Page() {
  return (
    <section>
      <Logo />
      <Header />
      <Subhead />
      <CurrencyImage />
      <LangImage />
      <br />
      <InputInfo />
      <Spacer />
      <OutputSelect />
      <CountryInput />
      <SearchButton />
      <CityImage />
      <PhoneImage />
      <Output />
      <br />
      <SakilaHeader />
      <SakilaOutputSelect />
      <SakilaInstruction />
      <SakilaInputBar />
      <SakilaSearchButton />
      <SakilaOutput />
    </section>
  );
}
