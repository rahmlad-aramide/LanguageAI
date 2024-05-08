'use client'
import { useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import {
	Alert,
	Document,
	TrashCanIcon,
	UploadIcon,
	UploadIconActive,
} from './svg';
import thumbGif from './thumbs.gif';
import { Button } from './shared/Button';
import { useNotification } from '../contexts';

export function formatFileSize(fileSizeBytes: number) {
	// Define size units and their respective suffixes
	const sizeUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	// Initialize variables
	let size = fileSizeBytes;
	let unitIndex = 0;

	// Convert to appropriate unit
	while (size >= 1024 && unitIndex < sizeUnits.length - 1) {
		size /= 1024.0;
		unitIndex += 1;
	}

	// Format the result with 2 decimal places
	const formattedSize = `${size.toFixed(2)} ${sizeUnits[unitIndex]}`;

	return formattedSize;
}

export function extractFileExtension(inputString: string) {
	// Use a regular expression to match the word after the .
	const match = inputString.match(/\.([^.]+)$/);

	// Check if there's a match
	if (match && match[1]) {
		// Extract the matched word and convert it to uppercase
		const extractedWordUppercase = match[1].toUpperCase();
		return extractedWordUppercase;
	} else {
		// Return null or handle the case where there is no match
		return null;
	}
}

export function addWhitespaceAfterComma(inputString: string) {
	const resultString = inputString.replace(/,/g, ', ');

	return resultString;
}

const DisplayErrorMessage = ({ errMessage = '' }) => {
	if (!errMessage) return;
	return (
		<div className={`flex mt-2 text-red-500 text-sm break-words`}>
			<div className='pt-0.5 mr-1'>
				<Alert />
			</div>
			{errMessage === 'Too many files'
				? "Can't upload more than 10 files at once"
				: addWhitespaceAfterComma(errMessage)}
		</div>
	);
};
export default DisplayErrorMessage;

export const UploadFile = () => {
	const { notify } = useNotification();
	const [entering, setEntering] = useState(false);
	const [clearError, setClearError] = useState(false);
	const [uploadedFile, setUploadedFile] = useState<any | null>(null);
	const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
		useDropzone({
			onFileDialogCancel: () => setUploadedFile(null),
			onFileDialogOpen: () => setUploadedFile(null),
			onDragEnter: () => setEntering(true),
			onDragLeave: () => setEntering(false),
			maxFiles: 1,
			multiple: false,
			accept: {
				'application/pdf': ['.pdf'],
			},
			onDrop: (acceptedFiles, fileRejections) => {
				setEntering(false);
				setUploadedFile(acceptedFiles);
				fileRejections && setClearError(false);
			},
		});

	const attachmentData = new FormData();
	acceptedFiles.forEach((file) => {
		attachmentData.append('attachments', file);
	});

	const acceptedFileItems = acceptedFiles.map((file, idx) => {
		return (
			<div key={idx} className='flex items-center gap-2'>
				<div className='h-8'>
					<Document />
				</div>
				<p className='text-xs font-semibold text-[#424348] text-left'>
					{file.name}
				</p>
			</div>
		);
	});

	const fileRejectionItems = fileRejections.map(
		({ errors }) => `${errors[0].message}`
	);

	return (
		<div>
			<div
				className={`cursor-pointer max-w-lg mx-auto w-full min-h-[200px] h-fit rounded-lg border-dashed border-[0.861px] transition duration-200 border-primary/60 bg-primary/10`}
			>
				<div
					{...getRootProps()}
					className={`flex flex-col items-center justify-center p-10 rounded-lg ${
						entering ? 'bg-primary/20 border-primary' : ''
					} ${uploadedFile ? 'min-h-fit' : 'min-h-[200px]'}`}
				>
					{!uploadedFile ||
					uploadedFile === null ||
					uploadedFile.length === 0 ||
					entering ? (
						<div
							className={`w-20 h-20 mb-4 rounded-full flex justify-center items-center`}
						>
							{entering ? <UploadIconActive /> : <UploadIcon />}
						</div>
					) : (
						<div
							className={`w-20 h-20 bg-white/50 rounded-full flex justify-center items-center`}
						>
							<Image src={thumbGif} alt='' width={48} height={48} />
						</div>
					)}
					{!uploadedFile ||
					uploadedFile === null ||
					uploadedFile.length === 0 ? (
						<div>
							<p className='text-[#81848F] text-center mb-0.5'>
								<span className='text-[#242428] font-semibold'>
									Drag file here
								</span>{' '}
								<br />
								or <span className='text-primary'>click to browse</span> (10MB)
								Max
							</p>
						</div>
					) : entering ? (
						''
					) : (
						''
					)}
					<input {...getInputProps()} />
				</div>
				{uploadedFile && (
					<div
						className={`flex w-full border-primary/60 border-dashed border rounded-lg p-2 ${
							acceptedFileItems.length === 1 ? 'flex-row' : 'flex-col'
						} justify-between items-center text-[#81848F] mt-2 text-center`}
					>
						<div
							className={`${
								acceptedFileItems.length === 1 ? '' : 'w-full flex-col gap-1'
							} flex items-center`}
						>
							{acceptedFileItems}
						</div>
						<div className='flex gap-2 self-end'>
							<Button
								onClick={() => notify("Sorry! This is a coming soon feature", 'inform')}
								// disabled={Uploading || !!fileRejectionItems[0]}
								// loading={Uploading}
								className='hover:bg-primary/80 bg-primary'
							>
								Upload
							</Button>
							<Button
								onClick={() => {
									setUploadedFile(null);
									setClearError(true);
								}}
								className='hover:bg-white bg-transparent transition duration-200 p-0'
							>
								<TrashCanIcon />
							</Button>
						</div>
					</div>
				)}
			</div>
			<DisplayErrorMessage
				errMessage={clearError ? '' : fileRejectionItems[0]}
			/>
		</div>
	);
};
