<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Role::create(['name' => 'admin']);
        $student = Role::create(['name' => 'student']);

        Permission::create(['name' => 'manage courses']);
        Permission::create(['name' => 'enroll courses']);

        $admin->givePermissionTo('manage courses');
        $student->givePermissionTo('enroll courses');
    }
}
