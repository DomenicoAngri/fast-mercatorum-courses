<script lang="ts">
  import { onMount } from 'svelte';
  import ErrorNotification from '$lib/components/ErrorNotification.svelte';
  import apiService, { type Course } from '$lib/services/api';

  // Application state
  let courses: Course[] = [];
  let loading: boolean = true;
  let error: string | null = null;
  let notificationType: 'error' | 'warning' | 'success' = 'error';
  let serverStatus: 'connected' | 'error' | 'disconnected' = 'disconnected';

  // Check server connection status
  async function checkServerStatus(): Promise<void> {
    try {
      const data = await apiService.checkHealth();
      serverStatus = data.status === 'ok' ? 'connected' : 'error';
    } catch (err) {
      serverStatus = 'disconnected';
      console.error('Connection error:', err);
    }
  }

  // Load all available courses
  async function loadCourses(): Promise<void> {
    loading = true;
    error = null;

    try {
      courses = await apiService.getCourses();
    } catch (err) {
      if (err instanceof Error) {
        error = `Error loading courses: ${err.message}`;
      } else {
        error = 'Unknown error loading courses';
      }
      console.error(error, err);
    } finally {
      loading = false;
    }
  }

  // Start automatic viewing of a course
  async function startCourse(id: number): Promise<void> {
    try {
      const response = await apiService.startCourse(id);

      // Update course in UI
      courses = courses.map((course) =>
        course.id === id ? { ...course, in_progress: true } : course
      );

      // Show success notification
      notificationType = 'success';
      const courseName = courses.find((c) => c.id === id)?.title || 'Unknown';
      error = `Course "${courseName}" started successfully`;
    } catch (err) {
      notificationType = 'error';
      if (err instanceof Error) {
        error = `Error starting course: ${err.message}`;
      } else {
        error = 'Unknown error starting course';
      }
      console.error(error, err);
    }
  }

  // Stop viewing a course
  async function stopCourse(id: number): Promise<void> {
    try {
      const response = await apiService.stopCourse(id);

      // Update course in UI
      courses = courses.map((course) =>
        course.id === id ? { ...course, in_progress: false } : course
      );

      // Show success notification
      notificationType = 'success';
      const courseName = courses.find((c) => c.id === id)?.title || 'Unknown';
      error = `Course "${courseName}" stopped successfully`;
    } catch (err) {
      notificationType = 'error';
      if (err instanceof Error) {
        error = `Error stopping course: ${err.message}`;
      } else {
        error = 'Unknown error stopping course';
      }
      console.error(error, err);
    }
  }

  // Initialize the page
  onMount(() => {
    checkServerStatus();
    loadCourses();

    // Check server status periodically
    const statusInterval = setInterval(checkServerStatus, 30000);

    return () => {
      clearInterval(statusInterval);
    };
  });
</script>

<div>
  <section class="mb-8">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Course Dashboard</h2>
      <div class="flex items-center space-x-2">
        <span class="text-sm">Server status:</span>
        <span
          class={`inline-block h-3 w-3 rounded-full ${
            serverStatus === 'connected'
              ? 'bg-green-500'
              : serverStatus === 'error'
                ? 'bg-yellow-500'
                : 'bg-red-500'
          }`}
        ></span>
        <span class="text-sm">{serverStatus}</span>
      </div>
    </div>

    <div class="mt-2">
      <button
        on:click={loadCourses}
        class="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
      >
        Reload courses
      </button>
    </div>
  </section>

  <ErrorNotification message={error || ''} type={notificationType} />

  <section>
    {#if loading}
      <div class="flex justify-center p-8">
        <div class="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    {:else}
      <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {#each courses as course (course.id)}
          <div class="rounded-lg border bg-white p-4 shadow">
            <h3 class="text-lg font-medium">{course.title}</h3>

            <div class="mt-3 flex items-center">
              <span class="mr-2 text-sm">Status:</span>
              {#if course.completed}
                <span class="rounded bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
              {:else if course.in_progress}
                <span class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">In progress</span>
              {:else}
                <span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">Not started</span>
              {/if}
            </div>

            <div class="mt-4 flex justify-end space-x-2">
              {#if course.in_progress}
                <button
                  on:click={() => stopCourse(course.id)}
                  class="rounded bg-red-500 px-3 py-1 text-sm text-white transition-colors hover:bg-red-600"
                >
                  Stop
                </button>
              {:else if !course.completed}
                <button
                  on:click={() => startCourse(course.id)}
                  class="rounded bg-blue-500 px-3 py-1 text-sm text-white transition-colors hover:bg-blue-600"
                >
                  Start
                </button>
              {/if}
            </div>
          </div>
        {/each}
      </div>

      {#if courses.length === 0}
        <div class="py-8 text-center text-gray-500">No courses available</div>
      {/if}
    {/if}
  </section>
</div>
