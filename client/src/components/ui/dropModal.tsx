import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useDropModal from "@/hooks/useDropModal";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import image from "@/assets/jpg.png";
import pdf from "@/assets/pdf.png";
import doc from "@/assets/doc.png";
import { useToast } from "./use-toast";
import { API_ENDPOINTS } from "@/lib/settings";

const allowedImageExtensions = [".jpg", ".jpeg", ".png"];
const allowedDocumentExtensions = [".pdf", ".doc", ".docx"];

const getFileExtension = (fileName: string) => {
  const parts = fileName.split(".");
  return parts.length > 1 ? `.${parts.pop()!.toLowerCase()}` : "";
};

const isImageType = (fileExtension: string) =>
  allowedImageExtensions.includes(fileExtension);
const isDocumentType = (fileExtension: string) =>
  allowedDocumentExtensions.includes(fileExtension);

const DropModal = () => {
  const isOpen = useDropModal((state) => state.isOpen);
  const closeModal = useDropModal((state) => state.onClose);
  const onFilesUploaded = useDropModal((state) => state.onFilesUploaded);
  const currentKey = useDropModal((state) => state.currentKey);

  const [filePreviews, setFilePreviews] = useState<
    { name: string; type: string }[]
  >([]);

  const { toast } = useToast();

  const [error, setError] = useState<string | null>(null);
  const [imagesData, setImagesData] = useState<FormData>();

  const uploadImages = useCallback(async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_PUBLIC_API_URL + API_ENDPOINTS.UPLOADIMAGE,
        {
          method: "POST",
          body: imagesData,
        }
      );
      if (response.ok) {
        const data = await response.json();
        onFilesUploaded(data.filenames);
        // onFilesUploaded(data.filenames as string[]);
        closeModal();
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "File size too large",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  }, [closeModal, imagesData, onFilesUploaded, toast]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFilePreviews([]);
    setError(null);
    // Create a FormData object to send files to the server
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
      const fileExtension = getFileExtension(file.name);

      if (isImageType(fileExtension)) {
        // Display image without the extension
        setFilePreviews((prevPreviews) => [
          ...prevPreviews,
          { name: file.name, type: "image" },
        ]);
      } else if (isDocumentType(fileExtension)) {
        // Display document with the extension
        setFilePreviews((prevPreviews) => [
          ...prevPreviews,
          { name: file.name, type: fileExtension },
        ]);
      } else {
        setError(`File type not allowed: ${file.name}`);
      }
    });
    setImagesData(formData);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    setFilePreviews([]);
  }, [currentKey]);

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Upload the documents</DialogTitle>
        </DialogHeader>
        <div
          {...getRootProps()}
          className={`dropzone border-dashed border-2 p-8 mt-2 mb-2 cursor-pointer ${
            isDragActive ? "border-blue-500" : "border-gray-300"
          }`}
        >
          <input {...getInputProps()} />
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : filePreviews.length === 0 ? (
            <p className="text-gray-500 text-sm">
              Drag 'n' drop files here, or click to select files
            </p>
          ) : (
            <div className="flex flex-row gap-2 justify-between items-center">
              {filePreviews.map(({ name, type }, index) => (
                <div
                  key={index}
                  className="min-w-20 bg-slate-100 rounded-md shadow-lg p-2"
                >
                  {type === "image" && (
                    <img src={image} className="w-16" alt="" />
                  )}
                  {type === ".pdf" && <img src={pdf} className="w-16" alt="" />}
                  {(type === ".doc" || type === ".docx") && (
                    <img src={doc} className="w-16" alt="" />
                  )}
                  <p className="text-[10px] mt-2 text-center">{name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" size={"sm"} onClick={uploadImages}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DropModal;
