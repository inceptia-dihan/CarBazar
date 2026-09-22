<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Attributes\Description;
use Illuminate\Console\Attributes\Signature;
use Illuminate\Console\Command;

#[Signature('user:promote-admin {email : The email of the user to promote}')]
#[Description('Promote a user to platform administrator')]
class PromoteAdmin extends Command
{
    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $email = $this->argument('email');
        $user = User::where('email', $email)->first();

        if (! $user) {
            $this->error("User with email '{$email}' was not found.");

            return self::FAILURE;
        }

        $user->update(['is_admin' => true]);
        $this->info("Success: {$user->name} ({$user->email}) is now an Administrator.");

        return self::SUCCESS;
    }
}
