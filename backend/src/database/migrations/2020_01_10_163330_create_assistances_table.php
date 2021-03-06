<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAssistancesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('assistances', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('user_code');
            $table->unsignedBigInteger('monitor_id');
            $table->unsignedBigInteger('event_id');
            $table->enum('status',['present','absent','late'])->default('absent');
            $table->date('date');
            $table->timeTz('time');
            $table->enum('intership',['boys','girls','no-def'])->default('no-def');
            $table->timestamps();

            //Relations

            $table->foreign('event_id')
                  ->references('id')
                  ->on('events')
                  ->onDelete('cascade');

            $table->foreign('user_code')
                ->references('code')
                ->on('users')
                ->onDelete('cascade');

            $table->foreign('monitor_id')
                ->references('id')
                ->on('users')
                ->onDelete('cascade');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('assistances', function(Blueprint  $table){
            $table->dropForeign(['user_code']);
            $table->dropForeign(['event_id']);
            $table->dropForeign(['monitor_id']);
            $table->dropColumn('user_code');
            $table->dropColumn('event_id');
            $table->dropColumn('monitor_id');

        });
        Schema::dropIfExists('assistances');
    }
}
