import { NextResponse } from 'next/server';
import { fetchPolicyDocuments, fetchPolicyCategories, addPolicyDocument, updatePolicyDocument, deletePolicyDocument } from '@/lib/data';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const categoryId = searchParams.get('category');
    
    if (type === 'categories') {
      const categories = await fetchPolicyCategories();
      return NextResponse.json(categories);
    }
    
    const docs = await fetchPolicyDocuments(categoryId);
    return NextResponse.json(docs);
  } catch (error) {
    console.error('Fetch policies error:', error);
    return NextResponse.json({ error: 'Failed to fetch policies' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const doc = await request.json();
    const newDoc = await addPolicyDocument(doc);
    return NextResponse.json({ success: true, policy: newDoc });
  } catch (error) {
    console.error('Add policy error:', error);
    return NextResponse.json({ error: 'Failed to add policy' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const doc = await request.json();
    if (!doc.id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    const updatedDoc = await updatePolicyDocument(doc.id, doc);
    return NextResponse.json({ success: true, policy: updatedDoc });
  } catch (error) {
    console.error('Update policy error:', error);
    return NextResponse.json({ error: 'Failed to update policy' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await deletePolicyDocument(Number(id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete policy error:', error);
    return NextResponse.json({ error: 'Failed to delete policy' }, { status: 500 });
  }
}
