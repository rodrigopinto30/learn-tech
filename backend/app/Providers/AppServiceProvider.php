<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Models\AssignmentSubmission;
use App\Observers\AssignmentSubmissionObserver;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        AssignmentSubmission::observe(AssignmentSubmissionObserver::class);
    }
}
