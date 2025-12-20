import { createSignal, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';

const getRandom = (min: number, max: number) =>
	Math.random() * (max - min) + min;

const UploadCard: Component = () => {
	const [prog] = createSignal(getRandom(0, 100));

	return (
		<Portal>
			<div class="absolute right-5 bottom-5 card card-border bg-neutral w-96">
				<div class="card-body">
					<div class="card-title">Uploading</div>
					<progress class="progress w-full" value={prog()} max={100} />
				</div>
			</div>
		</Portal>
	);
};

export default UploadCard;
