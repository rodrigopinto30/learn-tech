<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $manageCourses = Permission::create(['name' => 'manage courses']);
        $watchLessons = Permission::create(['name' => 'watch lessons']);

        $admin = Role::create(['name' => 'admin']);
        $student = Role::create(['name' => 'student']);

        $admin->givePermissionTo($manageCourses);
        $student->givePermissionTo($watchLessons);
    }
}
