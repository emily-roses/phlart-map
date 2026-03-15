<script lang="ts">
    const mainFilterTypes = ["landmark", "architecture", "exhibits"];
</script>
<div id="main-filter-wrapper">
    {#each mainFilterTypes as mainFilter}
    <input id={mainFilter} type="checkbox">
    <label for={mainFilter}>{mainFilter}</label>
    {/each}
</div>
<style>
    #main-filter-wrapper{
        display: flex;
        flex-direction: row;
        padding: 0.5em 0.25em;
        align-self: center;
        margin-right: 1em;
        background: rgba(0,0,0,0.2);
        z-index: 1000;
        width: fit-content;
    }
</style>