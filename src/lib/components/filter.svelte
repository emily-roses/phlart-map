<script lang="ts">
    const mainFilterTypes = ["landmark", "architecture", "exhibits"];
</script>
{#each mainFilterTypes as mainFilter}
<input id={mainFilter} type="checkbox">
<label for={mainFilter}>{mainFilter}</label>
{/each}