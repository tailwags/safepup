import { signOut, useSession, type ActiveSession } from '@/lib/auth-client';
import { client } from '@/lib/safepup-client';
import { createUpload } from '@/lib/uppie/core';
import { createForm } from '@tanstack/solid-form';
import {
	createEffect,
	createSignal,
	For,
	Match,
	Show,
	Switch,
	type Component,
} from 'solid-js';
import UploadCard from '@/components/UploadCard';

export interface DashBoardProps {
	initialSession: ActiveSession;
}

const DashBoard: Component<DashBoardProps> = (props) => {
	const [session, setSession] = createSignal(props.initialSession);

	const { state, upload, abort, isUploading } = createUpload({
		// onLoadStart: () => console.log('Upload started'),
		onProgress: (progress) => console.log(`${progress}% uploaded`),
		// onLoad: () => console.log('Upload complete!'),
		onError: (error) => console.error('Upload failed:', error),
	});

	const form = createForm(() => ({
		defaultValues: {
			files: [] as File[],
		},
		onSubmit: async ({ value }) => {
			const { data: uploadURL, error } =
				await client.api.v1['upload-url'].get();

			if (error) {
				console.error(error);
				return;
			}

			upload(uploadURL, value.files[0]!);
		},
	}));

	const sessionProvider = useSession();

	createEffect(() => {
		const data = sessionProvider().data;
		if (data) {
			setSession(data);
		}
	});

	const handleSignOut = async () => {
		await signOut();
		window.location.reload();
	};

	const removeFile = (index: number) => {
		const currentFiles = form.getFieldValue('files');
		form.setFieldValue(
			'files',
			currentFiles.filter((_, i) => i !== index),
		);
	};

	return (
		<>
			<div class="flex flex-col min-h-screen items-center justify-center p-4">
				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.stopPropagation();
						form.handleSubmit();
					}}
				>
					<form.Field
						name="files"
						validators={{
							onChange: ({ value }) => {
								if (value.length === 0) return 'At least one file is required';
								// if (value.length > maxFiles)
								// 	return `Maximum ${maxFiles} files allowed`;

								// for (const file of value) {
								// 	const maxBytes = maxSizeMB * 1024 * 1024;
								// 	if (file.size > maxBytes)
								// 		return `File "${file.name}" exceeds ${maxSizeMB}MB`;
								// 	if (file.size === 0) return `File "${file.name}" is empty`;
								// }
								return undefined;
							},
						}}
						children={(field) => (
							<div>
								<fieldset class="fieldset">
									<input
										type="file"
										class="file-input"
										multiple
										onChange={(e) =>
											field().handleChange(Array.from(e.target.files || []))
										}
									/>
									<Show
										when={
											field().state.meta.isTouched &&
											field().state.meta.errors.length > 0
										}
									>
										<label class="label">{field().state.meta.errors[0]}</label>
									</Show>
								</fieldset>

								<Show when={field().state.value.length > 0}>
									<table class="table">
										<tbody>
											<For each={field().state.value}>
												{(file, index) => (
													<tr>
														<th>{file.name}</th>
														<th>
															<button
																class="btn btn-ghost"
																onClick={() => removeFile(index())}
															>
																Remove
															</button>
														</th>
													</tr>
												)}
											</For>
										</tbody>
									</table>
								</Show>
							</div>
						)}
					/>
					<button class="btn btn-primary" type="submit">
						Upload
					</button>
				</form>
				<div>
					<button
						class="btn btn-primary"
						onClick={abort}
						disabled={!isUploading()}
					>
						Cancel
					</button>

					{/* Direct access to state */}
					<Show when={isUploading()}>
						<div>
							<progress
								class="progress w-56"
								value={state().progress}
								max={100}
							/>
							<p>{/* {upload.loaded()} / {upload.total()} bytes */}</p>
						</div>
					</Show>

					<Switch>
						<Match when={state().status === 'success'}>
							<p>✓ Upload successful!</p>
						</Match>
						<Match when={state().status === 'error'}>
							<p>✗ Error: {state().error?.message}</p>
						</Match>
					</Switch>
				</div>
				<div>{session().user.name}</div>
				<button class="btn btn-primary" onClick={handleSignOut}>
					Sign out
				</button>
			</div>

			<UploadCard />
		</>
	);
};

export default DashBoard;
