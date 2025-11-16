console.log("App is running");

function searchcon() {
    const inputEl = document.getElementById('country-input');
    if (!inputEl) return;
    const input = inputEl.value.trim();
    if (!input) return;

    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(input)}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (!data || data.length === 0) {
                throw new Error('No country found');
            }
            const country = data[0];
            // Helpers
            const el = id => document.getElementById(id);
            const formatNumber = n => (typeof n === 'number' ? n.toLocaleString() : 'N/A');
            const joinObjectValues = obj => obj && typeof obj === 'object' ? Object.values(obj).join(', ') : 'N/A';
            const formatCurrencies = curObj => {
                if (!curObj) return 'N/A';
                return Object.entries(curObj).map(([code, v]) => `${v.name} (${code}${v.symbol ? `, ${v.symbol}` : ''})`).join('; ');
            };
            const formatCalling = idd => {
                if (!idd) return 'N/A';
                const root = idd.root || '';
                const suffixes = idd.suffixes || [];
                return suffixes.length ? suffixes.map(s => `${root}${s}`).join(', ') : (root || 'N/A');
            };

            el('country-name').innerText = country.name?.common || 'N/A';
            el('country-info').innerText = country.region || 'N/A';
            el('country-subregion').innerText = country.subregion || 'N/A';
            el('country-capital').innerText = country.capital?.[0] || 'N/A';
            el('country-population').innerText = formatNumber(country.population);
            el('country-area').innerText = country.area ? `${formatNumber(country.area)} km²` : 'N/A';
            el('country-languages').innerText = joinObjectValues(country.languages) || 'N/A';
            el('country-currencies').innerText = formatCurrencies(country.currencies);
            el('country-timezones').innerText = (country.timezones || []).join(', ') || 'N/A';
            el('country-tld').innerText = (country.tld || []).join(', ') || 'N/A';
            el('country-calling').innerText = formatCalling(country.idd);
            el('country-independent').innerText = (typeof country.independent === 'boolean') ? (country.independent ? 'Yes' : 'No') : 'Unknown';
            el('country-un').innerText = (typeof country.unMember === 'boolean') ? (country.unMember ? 'Yes' : 'No') : 'Unknown';

            // Flag
            el('country-flag').innerHTML = country.flags?.png ? `<img src="${country.flags.png}" alt="Flag of ${country.name?.common || ''}">` : 'No flag';

            // Coat of arms
            const coatEl = el('country-coat');
            if (coatEl) {
                if (country.coatOfArms?.png) {
                    coatEl.innerHTML = `<img src="${country.coatOfArms.png}" alt="Coat of arms of ${country.name?.common || ''}">`;
                } else if (country.coatOfArms?.svg) {
                    coatEl.innerHTML = `<img src="${country.coatOfArms.svg}" alt="Coat of arms of ${country.name?.common || ''}">`;
                } else {
                    coatEl.innerText = 'No coat of arms available';
                }
            }

            // Links
            const wikiEl = el('country-wiki');
            const mapsEl = el('country-maps');
            if (wikiEl && mapsEl) {
                if (country.maps?.openStreetMaps) {
                    mapsEl.href = country.maps.openStreetMaps;
                    mapsEl.style.display = 'inline-block';
                } else if (typeof lat === 'number' && typeof lng === 'number') {
                    mapsEl.href = `https://www.openstreetmap.org/#map=5/${lat}/${lng}`;
                    mapsEl.style.display = 'inline-block';
                } else {
                    mapsEl.href = '#';
                    mapsEl.style.display = 'none';
                }

                if (country.name?.common) {
                    const wikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(country.name.common.replace(/\s+/g,'_'))}`;
                    wikiEl.href = wikiUrl;
                    wikiEl.style.display = 'inline-block';
                } else {
                    wikiEl.style.display = 'none';
                }
            }

            // Last updated
            const updatedEl = el('last-updated');
            if (updatedEl) updatedEl.innerText = `Last updated: ${new Date().toLocaleString()}`;

            const lat = country.latlng?.[0];
            const lng = country.latlng?.[1];

            if (typeof lat === 'number' && typeof lng === 'number') {
                const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 5},${lat - 5},${lng + 5},${lat + 5}&layer=mapnik&marker=${lat},${lng}`;
                const mapEl = document.querySelector('.google-map');
                if (mapEl) {
                    mapEl.innerHTML = `<iframe width="600" height="400" frameborder="0" src="${mapUrl}"></iframe>`;
                }
            } else {
                const mapEl = document.querySelector('.google-map');
                if (mapEl) mapEl.innerHTML = 'Map not available';
            }

        })
        .catch(err => {
            console.error('Error fetching country data:', err);
            alert('Error fetching country data: ' + err.message);
        });
}