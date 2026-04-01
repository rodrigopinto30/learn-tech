<?php

namespace App\Observers;

use App\Models\AssignmentSubmission;
use App\Models\Achievement;

class AssignmentSubmissionObserver
{

    public function created(AssignmentSubmission $submission): void
    {
        $user = \App\Models\User::find($submission->user_id);

        if ($user) {
            $this->checkAssignmentsAchievements($user);
        }
    }

    private function checkAssignmentsAchievements($user)
    {
        $submissionCount = $user->submissions()->where('status', 'submitted')->count();

        $pendingAchievements = Achievement::where('requirement_type', 'assignments')
            ->where('requirement_count', '<=', $submissionCount)
            ->whereDoesntHave('users', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->get();

        if ($pendingAchievements->isNotEmpty()) {
            $user->achievements()->attach($pendingAchievements->pluck('id'));
        }
    }

    /**
     * Handle the AssignmentSubmission "updated" event.
     */
    public function updated(AssignmentSubmission $assignmentSubmission): void
    {
        //
    }

    /**
     * Handle the AssignmentSubmission "deleted" event.
     */
    public function deleted(AssignmentSubmission $assignmentSubmission): void
    {
        //
    }

    /**
     * Handle the AssignmentSubmission "restored" event.
     */
    public function restored(AssignmentSubmission $assignmentSubmission): void
    {
        //
    }

    /**
     * Handle the AssignmentSubmission "force deleted" event.
     */
    public function forceDeleted(AssignmentSubmission $assignmentSubmission): void
    {
        //
    }
}
