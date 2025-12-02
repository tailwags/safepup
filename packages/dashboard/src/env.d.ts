// oxlint-disable-next-line triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

declare namespace App {
	// Note: 'import {} from ""' syntax does not work in .d.ts files.
	interface Locals {
		session: import('./lib/auth-client').ActiveSession | null;
	}
}
