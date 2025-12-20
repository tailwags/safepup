import { createSignal, type Accessor } from 'solid-js';

export interface UploadState {
	status: 'idle' | 'uploading' | 'success' | 'error';
	progress: number;
	error: Error | null;
}

export interface UploadResponse {
	state: UploadState;
}

export interface UploadOptions {
	method?: 'PUT' | 'POST' | string;
	headers?: Record<string, string>;
	onProgress?: (progress: number) => void;
	onError?: (error: Error) => void;
}

export interface UploadResult {
	state: Accessor<UploadState>;
	upload: (url: string | URL, file: File) => void;
	abort: () => void;

	isIdle: Accessor<boolean>;
	isUploading: Accessor<boolean>;
	isSuccess: Accessor<boolean>;
	isError: Accessor<boolean>;
}

export function createUpload(options: UploadOptions): UploadResult {
	const [state, setState] = createSignal<UploadState>({
		status: 'idle',
		progress: 0,
		error: null,
	});

	let req: XMLHttpRequest | null = null;

	const upload = (url: string | URL, file: File) => {
		req = new XMLHttpRequest();

		req.upload.addEventListener('loadstart', () => {
			setState({
				status: 'uploading',
				progress: 0,
				// loaded: 0,
				// total: options.file.size,
				error: null,
			});
			// options.onLoadStart?.();
		});

		req.upload.addEventListener('load', () => {
			setState((prev) => ({ ...prev, status: 'success', progress: 100 }));
		});

		req.upload.addEventListener('progress', (e) => {
			if (e.lengthComputable) {
				const progress = Math.round((e.loaded * 100) / e.total);
				setState((prev) => ({ ...prev, progress }));
				options.onProgress?.(progress);
			}
		});

		req.addEventListener('error', () => {
			const error = new Error('Network error occurred during upload');
			setState((prev) => ({
				...prev,
				status: 'error',
				error,
			}));
			options.onError?.(error);
		});

		req.addEventListener('loadend', () => {
			// options.onLoadEnd?.();
			req = null; // Clean up reference
		});

		req.open(options.method ?? 'PUT', url);

		Object.entries(options.headers ?? {}).forEach(([k, v]) => {
			req!.setRequestHeader(k, v);
		});

		if (!options.headers?.['Content-Type']) {
			req.setRequestHeader('Content-Type', 'application/octet-stream');
		}

		req.send(file);
	};

	const abort = () => {
		if (req) {
			req.abort();
		}
	};

	const isIdle = () => state().status === 'idle';
	const isUploading = () => state().status === 'uploading';
	const isSuccess = () => state().status === 'success';
	const isError = () => state().status === 'error';

	return {
		state,
		upload,
		abort,
		isIdle,
		isUploading,
		isSuccess,
		isError,
	};
}
