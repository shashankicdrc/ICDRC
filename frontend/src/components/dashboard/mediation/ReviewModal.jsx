import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
} from '@chakra-ui/react';
import { Button } from '../../ui/button';
import { Loader2, File } from 'lucide-react';

const ReviewModal = ({
    isOpen,
    onClose,
    formData,
    onConfirm,
    loading
}) => {
    const {
        fullName,
        email,
        opponentName,
        category,
        amount,
        jurisdiction,
        language,
        timeline,
        description,
        resolution,
        files
    } = formData;

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay backdropFilter="blur(5px)" bg="blackAlpha.300" />
            <ModalContent className="dark:bg-[#0f172a] border dark:border-slate-800 rounded-2xl">
                <ModalHeader className="border-b dark:border-slate-800 font-bold text-xl">
                    Review Your Submission
                </ModalHeader>
                <ModalCloseButton className="mt-2" />
                <ModalBody className="py-6 max-h-[70vh] overflow-y-auto">
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Full Name
                                </p>
                                <p className="font-medium">{fullName}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Email
                                </p>
                                <p className="font-medium">{email}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Opponent Name
                                </p>
                                <p className="font-medium">
                                    {opponentName}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Dispute Category
                                </p>
                                <p className="font-medium">{category}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Dispute Amount
                                </p>
                                <p className="font-medium">
                                    ₹{amount || 'N/A'}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Jurisdiction
                                </p>
                                <p className="font-medium">
                                    {jurisdiction}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Language
                                </p>
                                <p className="font-medium">
                                    {language || 'Not Specified'}
                                </p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">
                                Timeline of Events
                            </p>
                            <p className="text-sm bg-muted/30 p-3 rounded-lg">
                                {timeline || 'N/A'}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">
                                Description
                            </p>
                            <p className="text-sm bg-muted/50 p-3 rounded-lg">
                                {description}
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase font-semibold">
                                Desired Resolution
                            </p>
                            <p className="font-medium">{resolution}</p>
                        </div>
                        {files.length > 0 && (
                            <div className="space-y-2">
                                <p className="text-xs text-muted-foreground uppercase font-semibold">
                                    Files Attached ({files.length})
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {files.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 p-2 bg-muted/40 rounded-lg border border-border/50 overflow-hidden"
                                        >
                                            <div className="p-1.5 bg-blue-500/10 rounded-md">
                                                <File className="w-4 h-4 text-blue-500" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-medium truncate">
                                                    {file.name}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground">
                                                    {(
                                                        file.size /
                                                        (1024 * 1024)
                                                    ).toFixed(2)}{' '}
                                                    MB
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </ModalBody>
                <ModalFooter className="flex gap-3 pt-4 border-t dark:border-slate-800">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="px-6 rounded-full hover:bg-muted transition-colors"
                    >
                        Edit
                    </Button>
                    <Button
                        onClick={onConfirm}
                        className="px-8 bg-orange-600 hover:bg-orange-700 text-white rounded-full transition-all shadow-lg hover:shadow-orange-500/20"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="animate-spin mr-2" />
                        ) : (
                            'Confirm & Submit'
                        )}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReviewModal;
