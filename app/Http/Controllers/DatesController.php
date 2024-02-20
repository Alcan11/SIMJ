<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Date;

class DatesController extends Controller
{
    public function guardar(Request $request)
    {
        Date::create([
            'color' => $request->input('color'),
            'festive' => $request->input('festive'),
            'year' => $request->input('year')
        ]);
        
        return response()->json(['message' => 'Datos guardados correctamente'], 200);
    }
}
