import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  handleChangeType(type){
    this.setState({
      ...this.state,
      filters: {
        type: type
      }
    })
  }

  handleFindPetsClick(){

    let query = this.state.filters.type == "all" ? "/api/pets" : "/api/pets?type=" + this.state.filters.type

    fetch(query).then((response) => {
      return response.json();
    })
    .then((myJson) => {
      this.setState({
        ...this.state,
        pets : myJson
      })
    });
  }

  handleAdoptPet(petId){
    const pets = [...this.state.pets];
    pets.find((pet) => pet.id == petId).isAdopted = true;
    this.setState({
      ...this.state,
      pets : pets
    })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters 
                onChangeType={(type) => this.handleChangeType(type)}
                onFindPetsClick={() => this.handleFindPetsClick()}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={(petId) => this.handleAdoptPet(petId)}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
