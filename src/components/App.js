import React, { useState } from "react";
import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  

  function selectAnimalType (animalType) {
    setFilters(animalType)
  }

  function findPets() {
    
    fetch(`http://localhost:3001/pets/`)
      .then(response => response.json())
      .then(pets => { 
        
        const petsArray = pets.filter( pet => pet.type === filters )
        // console.log(petsArray)
        
        setPets(petsArray)
      }
    )
  }

  function adoptPet(petId) {
    const updatedPet = pets.map(pet => {
      return pet.id === petId ? {...pet, isAdopted : true } : pet;
    })

    setPets(updatedPet)
  }


  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={selectAnimalType} onFindPetsClick={findPets}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={adoptPet}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
