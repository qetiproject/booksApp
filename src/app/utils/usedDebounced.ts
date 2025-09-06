// //use debouncedSignal function
//   #searchControlSignal = signal<string>(this.searchControl.value || '');

//   #searchResultSignal = signal<BooksView[]>([]);
//   searchSignal = computed(() => this.#searchResultSignal());

//   constructor() {
//      // 1️⃣ Update searchControlSignal when FormControl changes
//      this.searchControl.valueChanges.subscribe(value => {
//       this.#searchControlSignal.set(value?.trim() || '');
//      });

//       // 2️⃣ Create debounced version of the signal
//       const debouncedSearch = debouncedSignal(this.#searchControlSignal, 300);

//        // 3️⃣ Effect reacts to debounced signal changes
//        effect((onCleanup) => {
//         const query = debouncedSearch();

//         if(!query) {
//           this.#searchResultSignal.set([]);
//           return;
//         }
//         const subscription = this.bookService.searchBooks(query).pipe(
//           catchError(err => {
//             return of([]);
//           })
//         ).subscribe(res => this.#searchResultSignal.set(res));
//         onCleanup(() => subscription.unsubscribe());
//        });
//   }
