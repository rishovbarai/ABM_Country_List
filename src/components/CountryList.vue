<template>
    <div class="container mt-5">
      <!-- Header -->
      <h1 class="text-center mb-4">Country List</h1>
  
      <!-- Search Field -->
      <div class="d-flex justify-content-center mb-4 position-relative">
        <input v-model="searchQuery" type="text" class="form-control search-bar" placeholder="Search countries" />
        <i class="fas fa-search search-icon"></i>
      </div>
  
      <!-- Country List -->
      <div class="row justify-content-center">
        <div v-for="country in filteredCountries" :key="country.name" class="col-12 mb-4">
          <div class="card custom-card">
            <div class="card-body d-flex">
              <!-- Flag -->
              <div class="flex-fill d-flex justify-content-center align-items-center">
                <img :src="country.flags.png" :alt="country.name" class="w-100" style="height: 8rem;" />
              </div>
  
              <!-- Country Details and Buttons -->
              <div class="col-7 d-flex flex-column">
                <div style="margin-left: 10px;">
                  <h5 class="card-title">{{ country.name }}</h5>
                  <p class="card-text mb-1">
                    <strong>Currency:</strong> {{ country.currencies[0].name }} ({{ country.currencies[0].symbol }})
                  </p>
                  <p class="card-text">
                    <strong>Time:</strong> {{ country.timezones[0] }}
                  </p>
                </div>
  
                <!-- Buttons -->
                <div class="mt-auto">
                  <button class="btn btn-primary btn-sm mr-2" @click="showMap(country)">
                    <strong>Show Map</strong>
                  </button>
                  <button class="btn btn-secondary btn-sm" @click="$router.push({ name: 'CountryDetails', params: { id: country.name, country }})">
                    <strong>Details</strong>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        searchQuery: '',
        countries: [], // List of countries fetched from API
      };
    },
    computed: {
      filteredCountries() {
        return this.countries.filter((country) =>
          country.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    async created() {
      // Fetch country data from REST Countries v2 API
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        const data = await response.json();
        this.countries = data.map((country) => ({
          name: country.name,
          flags: country.flags,
          currencies: country.currencies || [{ name: 'N/A', symbol: 'N/A' }],
          timezones: country.timezones || ['N/A'],
          latlng: country.latlng || [0, 0],
        }));
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    },
    methods: {
      showMap(country) {
        const [lat, lng] = country.latlng;
        window.open(`https://www.google.com/maps?q=${lat},${lng}`, '_blank');
      },
      showDetails(country) {
        alert(`Details for ${country.name}:\nCurrency: ${country.currencies[0].name}\nTimezone: ${country.timezones[0]}`);
      },
    },
  };
  </script>
  
  <style>
  body {
    background-color: white;
  }
  
  /* Custom CSS for the search bar */
  .search-bar {
    border-radius: 0px;
    width: 450px;
    /* Fixed width for the search bar */
    padding-right: 40px;
    /* Add padding for the search icon */
  }
  
  .search-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.2rem;
    color: #aaa;
  }
  
  /* Custom CSS for the cards */
  .custom-card {
    width: 450px;
    /* Same width as the search bar */
    margin: 0 auto;
    /* Center the card */
  }
  
  /* Ensure cards have the same height */
  .card {
    display: flex;
    flex-direction: column;
  }
  
  .card-body {
    flex: 1;
    display: flex;
    padding: 13px;
  }
  
  /* Custom CSS for the buttons */
  .btn-primary.btn-sm {
    background: white;
    border: 2px solid blue;
    color: blue;
    height: 2.5rem;
    width: 6.7rem;
  }
  
  .btn-secondary.btn-sm {
    background: white;
    border: 2px solid blue;
    color: blue;
    height: 2.5rem;
    width: 6.7rem;
    margin-left: 1rem;
  }
  
  .mt-auto {
    margin-left: 10px;
  }
  </style>
  