---
icon: material/store-search-outline
title: Data Catalog
---

<script>
    // Hide sidebar. This script is only executed in the data catalog page.
    document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.querySelector('.md-sidebar--secondary');
        if (document.querySelector('.catalog-header') && sidebar) {
            sidebar.style.display = 'none';
            sidebar.style.width = '0';
            sidebar.style.padding = '0';
            sidebar.style.margin = '0';
        }
    });
</script>


<div class="catalog-header" markdown>
<div markdown>
The data catalog is a centralized hub to keep track of available datasets. It is regularly updated to include new data as it becomes available in any TEF node. If you want access to any dataset, please click "Contact" to reach the owners.

!!! question "[How to add new datasets?](./instructions.md)"
</div>

[:simple-github: Add New Datasets ](https://github.com/CitCom-VRAIN/CitCom-VRAIN.github.io/issues/new/choose){ .md-button .md-button--primary-light }
</div>

<!-- Search input -->
<div class="search-container">
    <div class="search-wrapper">
        <label class="md-search__icon md-icon" for="searchInput">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.5 3A6.5 6.5 0 0 1 16 9.5c0 1.61-.59 3.09-1.56 4.23l.27.27h.79l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.516 6.516 0 0 1 9.5 16 6.5 6.5 0 0 1 3 9.5 6.5 6.5 0 0 1 9.5 3m0 2C7 5 5 7 5 9.5S7 14 9.5 14 14 12 14 9.5 12 5 9.5 5Z"/></svg>
        </label>
        <input type="text" id="searchInput" placeholder="Search for datasets..." />
    </div>
    <button id="toggleFilters">
        <span class="filter-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14 12v7.88c.04.3-.06.62-.29.83a.996.996 0 0 1-1.41 0l-2.01-2.01a.989.989 0 0 1-.29-.83V12h-.03L4.21 4.62a1 1 0 0 1 .17-1.4c.19-.14.4-.22.62-.22h14c.22 0 .43.08.62.22a1 1 0 0 1 .17 1.4L14.03 12H14Z"/></svg>
        </span>
        <span class="check-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
        </span>
    </button>
</div>

| Dataset | Super Node | TEF Node | Site | Data Model | Sampling Time | Historical | Owner | Get Access |
| ------- | ---------- | -------- | ---- | ---------- | ------------- | ---------- | ----- | ---------- |
|  [Waste Container](./metadata_datasets/south_spain_valencia.md)  | South | Spain | Valencia | [gitlab_vlci](https://gitlab.com/vlci-public/models-dades/wastemanagement/-/blob/main/WasteContainer/spec.md?ref_type=heads) | RealTime | From 2000 | València City Council | [Contact](https://valencia.opendatasoft.com/pages/home/) |
|  [Weather Forecast](./metadata_datasets/south_spain_valencia.md)  | South | Spain | Valencia | [gitlab_vlci](https://gitlab.com/vlci-public/models-dades/weather/blob/main/WeatherForecast/spec.md) | Daily | From 2010 | València City Council | [Contact](https://valencia.opendatasoft.com/pages/home/) |
|  [Wate Container](docs/data_catalog/metadata_datasets/south_spain_valencia.md)  | South | Spain | Valencia | https://gitlab.com/vlci-public/models-dades/wastemanagement/-/blob/main/WasteContainer/spec.md?ref_type=heads | RealTime | From 2000 | València City Council | https://valencia.opendatasoft.com/pages/home/ |
|  [Weather Forecast](docs/data_catalog/metadata_datasets/south_spain_valencia.md)  | South | Spain | Valencia | https://gitlab.com/vlci-public/models-dades/weather/blob/main/WeatherForecast/spec.md | Daily | From 2010 | València City Council | https://valencia.opendatasoft.com/pages/home/ |
