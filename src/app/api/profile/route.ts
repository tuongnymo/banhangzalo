import { createServerSupabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') {
        // Nếu không tìm thấy profile, tạo mới
        const { data: user } = await supabase.auth.admin.getUserById(userId);
        
        if (user.user) {
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert({
              user_id: userId,
              full_name: user.user.user_metadata?.full_name || null,
            })
            .select()
            .single();
          
          if (createError) {
            throw createError;
          }
          
          return NextResponse.json({ profile: newProfile });
        }
        
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      
      throw error;
    }
    
    return NextResponse.json({ profile });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createServerSupabase();
    const body = await request.json();
    
    const { userId, ...profileData } = body;
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Kiểm tra xem profile đã tồn tại chưa
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();
    
    if (existingProfile) {
      // Cập nhật profile
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .update({
          ...profileData,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', userId)
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return NextResponse.json({
        success: true,
        profile,
      });
    } else {
      // Tạo profile mới
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .insert({
          user_id: userId,
          ...profileData,
        })
        .select()
        .single();
      
      if (error) {
        throw error;
      }
      
      return NextResponse.json({
        success: true,
        profile,
      });
    }
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
