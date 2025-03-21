<script lang="ts">
  import { onMount } from 'svelte';

  export let message: string = '';
  export let type: 'error' | 'warning' | 'success' = 'error';

  // Timeout to automatically hide notification after a few seconds
  export let autoHide: boolean = true;
  export let duration: number = 5000; // 5 seconds

  let visible: boolean = true;
  let timer: ReturnType<typeof setTimeout> | null = null;

  // Apply style based on notification type
  $: bgColor =
    type === 'error'
      ? 'bg-red-100 border-red-500 text-red-700'
      : type === 'warning'
        ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
        : 'bg-green-100 border-green-500 text-green-700';

  // Handle auto-hiding
  onMount(() => {
    if (autoHide && message) {
      timer = setTimeout(() => {
        visible = false;
      }, duration);

      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  });

  // Update visibility when message changes
  $: if (message) {
    visible = true;
    if (autoHide) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        visible = false;
      }, duration);
    }
  }

  function close(): void {
    visible = false;
    if (timer) clearTimeout(timer);
  }
</script>

{#if message && visible}
  <div class={`mb-4 border-l-4 p-4 ${bgColor}`} role="alert">
    <div class="flex items-start justify-between">
      <div>
        <p class="font-medium">
          {type === 'error' ? 'Error' : type === 'warning' ? 'Warning' : 'Success'}
        </p>
        <p>{message}</p>
      </div>
      <button
        on:click={close}
        class="ml-2 text-gray-500 hover:text-gray-800"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  </div>
{/if}
