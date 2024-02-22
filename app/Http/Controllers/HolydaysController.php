<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Holyday;

class HolydaysController extends Controller
{
    public function index()
    {
        $holydays = Holyday::all();
        return view('holydays', compact('holydays'));
    }

    public function save(Request $request)
    {
        Holyday::create([
            'name' => $request->input('name'),
            'color' => $request->input('color'),
            'day' => $request->input('day'),
            'month' => $request->input('month'),
            'year' => $request->input('year'),
            'recurring' => $request->input('recurring')
        ]);
        
        return response()->json(['message' => 'Datos guardados correctamente'], 200);
    }
}
