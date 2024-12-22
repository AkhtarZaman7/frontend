'use client';

import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  loading?: boolean;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  loading = false
}: DeleteConfirmationModalProps) {
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      backdrop="blur"
      placement="center"
      classNames={{
        backdrop: "bg-gradient-to-t from-zinc-900/50 to-zinc-900/20",
        base: "border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900",
        header: "border-b border-zinc-200 dark:border-zinc-700",
        body: "text-zinc-900 dark:text-zinc-100",
        footer: "border-t border-zinc-200 dark:border-zinc-700",
        closeButton: "hover:bg-zinc-100 dark:hover:bg-zinc-800",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="p-2 rounded-full bg-danger/10">
                  <AlertTriangle className="h-5 w-5 text-danger" />
                </div>
                <span className="text-zinc-900 dark:text-zinc-100">Delete Confirmation</span>
              </motion.div>
            </ModalHeader>
            <ModalBody>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="space-y-2"
              >
                <p className="text-zinc-700 dark:text-zinc-300">
                  Are you sure you want to delete this task?
                </p>
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  &quot;{title}&quot;
                </p>
                <p className="text-small text-danger">
                  This action cannot be undone.
                </p>
              </motion.div>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="light"
                onPress={onClose}
                className="font-medium text-zinc-700 dark:text-zinc-300"
              >
                Cancel
              </Button>
              <Button
                color="danger"
                variant="flat"
                onPress={onConfirm}
                className="font-medium bg-danger/20 text-danger-600 dark:text-danger-400"
                isLoading={loading}
              >
                Delete Task
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
} 