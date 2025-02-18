<template>
    <div class="container mt-5">
        <!-- Section 1: Flag and Country Details -->
        <div class="row mb-5">
            <!-- Big Flag -->
            <div class="col-md-8">
                <img :src="country.flags?.png" :alt="country.name" class="img-fluid" style="width: 100%; height: 500px; object-fit: contain; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);" />
            </div>
            
            <!-- Country Details -->
            <div class="col-md-4">
                <h1 class="mb-4">{{ country.name }}</h1>
                <img :src="country.flags?.png" :alt="country.name" class="img-fluid mb-3" style="max-height: 200px; object-fit: cover;" />
                <div class="country-info">
                    <p><strong>Currency:</strong> {{ country.currencies?.[0]?.name }} ({{ country.currencies?.[0]?.symbol }})</p>
                    <p><strong>Time:</strong> {{ country.timezones?.[0] }}</p>
                    <p><strong>Population:</strong> {{ formatNumber(country.population) }}</p>
                    <p><strong>Area:</strong> {{ formatNumber(country.area) }} km²</p>
                </div>
            </div>
        </div>

        <!-- Section 2: Neighboring Countries -->
        <div v-if="neighbors && neighbors.length" class="row">
            <div class="col-12">
                <h2 class="mb-4">Bordering Countries</h2>
                <div class="row">
                    <div v-for="neighbor in neighbors" :key="neighbor.name" class="col-md-3 mb-4">
                        <div class="card h-100">
                            <img :src="neighbor.flags.png" :alt="neighbor.name" class="card-img-top" style="height: 150px; object-fit: cover;" />
                            <div class="card-body">
                                <h5 class="card-title">{{ neighbor.name }}</h5>
                                <p class="card-text">Population: {{ formatNumber(neighbor.population) }}</p>
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
            country: {},
            neighbors: []
        };
    },
    methods: {
        formatNumber(num) {
            return num ? num.toLocaleString() : 'N/A';
        }
    },
    async created() {
        try {
            const response = await fetch(`https://restcountries.com/v2/name/${this.$route.params.id}`);
            const data = await response.json();
            this.country = data[0];

            // Only fetch neighbors if borders exist
            if (this.country.borders && this.country.borders.length) {
                // Fetch neighboring countries' data
                const borderPromises = this.country.borders.map(border =>
                    fetch(`https://restcountries.com/v2/alpha/${border}`).then(response => response.json())
                );
                this.neighbors = await Promise.all(borderPromises);
            }
        } catch (error) {
            console.error('Error fetching country details:', error);
        }
    }
};
</script>

<style>
body {
    background-color: white;
}

.country-info p {
    margin-bottom: 0.5rem;
}

.card {
    transition: transform 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card:hover {
    transform: translateY(-5px);
}
</style>
