<script>
  import '../app.css';
</script>

<div class="min-h-screen">
  <header class="bg-blue-600 p-4 text-white shadow-md">
    <div class="container mx-auto">
      <h1 class="text-2xl font-bold">FastCourse Viewer for Unimercatorum</h1>
    </div>
  </header>

  <main class="container mx-auto p-4">
    <slot />
  </main>

  <footer class="border-t bg-gray-100 p-4">
    <div class="container mx-auto text-center text-sm text-gray-500">
      &copy; {new Date().getFullYear()} FastCourse Viewer for Unimercatorum
    </div>
  </footer>
</div>
