import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MessageSquareX } from "lucide-react";

interface RemoveTripProps {
  tripId: string;
  onDeleted?: (id: string) => void;
}
function RemoveTrip({ tripId, onDeleted }: RemoveTripProps) {
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/trip/${tripId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const { error } = await res.json();
        console.error("Failed to delete trip:", error);
        return;
      }

      console.log("Trip deleted successfully ✅");
      if (onDeleted) onDeleted(tripId); // tell parent to update UI
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer hover:text-red-600">
          <MessageSquareX />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this trip?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this trip? Once deleted, all
            details, including your itinerary and saved preferences, will be
            permanently removed from our servers and cannot be recovered.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default RemoveTrip;
